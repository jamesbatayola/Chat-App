import { z } from "zod";

export const signupSchema = z
	.object({
		email: z
			.string()
			.trim()
			.nonempty({ message: "Email required" })
			.toLowerCase()
			.email({ message: "Invalid email" }),

		password: z
			.string()
			.nonempty({ message: "Password required" })
			.min(5, { message: "Password must be at least 5 characters" }),

		confirmPassword: z.string(),
	})
	// custom method for confirmPassword
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				path: ["confirmPassword"],
				message: "Password do not match",
				code: "custom",
			});
		}
	});

export const loginSchema = z.object({
	email: z
		.string()
		.trim()
		.nonempty({ message: "Email required" })
		.toLowerCase()
		.email({ message: "Email format is invalid" }),

	password: z.string().nonempty({ message: "Password required" }),
});
