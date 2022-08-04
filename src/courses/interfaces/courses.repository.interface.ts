import { CourseModel } from '@prisma/client';
import { CourseDto } from '../dto/Course.dto';

export interface ICoursesRepository {
	getCourses: () => Promise<CourseModel[]>;
	createCourse: (course: CourseDto) => Promise<CourseModel>;
	updateCourse: (course: CourseDto) => Promise<CourseModel>;
	deleteCourse: (id: number) => Promise<CourseModel>;
	getCoursesByCategory: (categoryId: number) => Promise<CourseModel[]>;
	getCoursesByTags: (tags: number[]) => Promise<CourseModel[]>;
}
