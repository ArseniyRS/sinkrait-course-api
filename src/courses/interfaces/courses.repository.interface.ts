import { CourseDto } from '../dto/Course.dto';

export interface ICoursesRepository {
	getCourses: () => Promise<CoursesModel[]>;
	createCourse: (course: CourseDto) => Promise<CoursesModel>;
	updateCourse: (course: CourseDto) => Promise<CourseModel>;
	deleteCourse: (id: number) => Promise<CourseModel>;
}
