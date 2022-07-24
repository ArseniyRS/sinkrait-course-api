import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvConfigOutput;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('Error loading config file');
		} else {
			this.config = result.parsed as DotenvConfigOutput;
		}
	}

	get<T extends number | string>(key: string): T {
		return this.config[key] as T;
	}
}
