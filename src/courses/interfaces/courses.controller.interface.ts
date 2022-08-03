import { NextFunction, Request, Response } from 'express';

export interface ICoursesController {
	createCourse(req: Request, res: Response, next: NextFunction): Promise<void>;
	updateCourse(req: Request, res: Response, next: NextFunction): Promise<void>;
	deleteCourse(req: Request, res: Response, next: NextFunction): Promise<void>;
	getAllCourses(req: Request, res: Response, next: NextFunction): Promise<void>;
}
