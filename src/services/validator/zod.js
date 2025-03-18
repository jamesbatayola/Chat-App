export const validate = (schema) => async (req, res, next) => {
	try {
		const result = schema.safeParse(req.body);

		if (!result.success) {
			const error = new Error("Validation failed");
			error.statusCode = 400;
			error.type = "input_validation_error";
			error.info = result.error.issues.map((issue) => ({
				field: issue.path[0],
				message: issue.message,
			}));
			throw error;
		}

		next();
	} catch (err) {
		err.statusCode = err.statusCode || 500;
		err.type = err.type || "unkown";
		err.message = err.message || "Error while validating signup";
		err.info = err.info || "N/A";
		next(err);
	}
};
