function ErrorCatcher(target: Object, propKey: string, propDesc: PropertyDescriptor) {
	const oldValue = propDesc.value;
	try {
		return oldValue();
	} catch {
		return null;
	}
}
