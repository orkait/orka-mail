export const showAJVErrors = (errors: any) => {
	return errors?.map((err: any) => {
		return {
			key: err.params?.missingProperty,
			message: err.message,
			params: err.params,
		};
	});
};
