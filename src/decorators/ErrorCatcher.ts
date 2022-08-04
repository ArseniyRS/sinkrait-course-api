import { CategoryModel, Prisma } from '@prisma/client';
import { HttpError } from '../errors/http-error.class';

export async function ErrorCatcher(
	target: Object,
	propKey: string,
	propDesc: PropertyDescriptor,
): Promise<void | null | TypedPropertyDescriptor<(id: number) => Promise<CategoryModel | null>>> {
	const oldValue = propDesc.value;
	try {
		const result = oldValue();
		return result;
	} catch {
		return null;
	}
}

export function TryCatchWrapper(target: Object, key: string, descriptor: PropertyDescriptor) {
	const oldFunc = descriptor.value;
	descriptor.value = async function (...args: any) {
		try {
			await oldFunc.apply(this, args);
		} catch (e: any) {
			const [, , next] = args;
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				next(new HttpError(500, e.message));
			}
			next(new HttpError(500, e.message || 'Error'));
		}
	};
}
