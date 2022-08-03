import { CourseDto } from '../dto/Course.dto';

export interface ICoursesService {
	createCourse(course: CourseDto): Promise<CourseModel>;
	updateCourse(course: CourseDto): Promise<CourseModel | null>;
	deleteCourse(id: number): Promise<CourseModel | null>;
	getAllCourses(): Promise<CourseModel[]>;
}
