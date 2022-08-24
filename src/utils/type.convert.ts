export function stringToOtherTypeConverter(value: string): any {
	if (Array.isArray(value)) {
		return value.map((el) => stringToOtherTypeConverter(el));
	}

	if (value === 'null') {
		return null;
	}
	if (value === 'undefined') {
		return undefined;
	}
	if (!isNaN(parseFloat(value))) {
		return parseFloat(value);
	}
	return value;
}
