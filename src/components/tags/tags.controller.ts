import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { ValidateMiddleware } from '../../common/validate.middleware';
import { TryCatchWrapper } from '../../decorators/ErrorCatcher';
import { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';
import { TagDto } from './dto/tag.dto';
import { ITagsController } from './interfaces/tags.controller.interface';
import { ITagsService } from './interfaces/tags.service.interface';

@injectable()
export class TagsController extends BaseController implements ITagsController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.TagsService) private tagsService: ITagsService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ method: 'get', path: '/tags', func: this.getAllTags, middlewares: [] },
			{
				method: 'post',
				path: '/tags',
				func: this.createTag,
				middlewares: [new ValidateMiddleware(TagDto)],
			},
			{
				method: 'put',
				path: '/tags',
				func: this.updateTag,
				middlewares: [new ValidateMiddleware(TagDto)],
			},
			{
				method: 'delete',
				path: '/tags',
				func: this.deleteTag,
				middlewares: [],
			},
		]);
	}

	@TryCatchWrapper
	async createTag({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.tagsService.createTag(body);
		this.ok(res, result);
	}

	@TryCatchWrapper
	async updateTag(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.tagsService.updateTag(req.body);
		this.ok(res, result);
	}

	@TryCatchWrapper
	async deleteTag(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.tagsService.deleteTag(req.body.id);
		this.ok(res, result);
	}

	@TryCatchWrapper
	async getAllTags(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.tagsService.getAllTags();
		this.ok(res, result);
	}
}
