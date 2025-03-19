export const loadSignupPage = () => {
	return `
        <form class="signup-form">
			<h1>Create Account</h1>
			<div>
				<label for="email">email</label>
				<input id="email" class="email-input" name="email" type="text" />
			</div>
			<div>
				<label for="password">password</label>
				<input id="password" class="password-input" name="password" type="text" />
			</div>
			<div>
				<label for="confirm_password">confirm password</label>
				<input
					id="confirmPassword"
					class="confirm-password-input"
					name="confirm_password"
					type="text"
				/>
			</div>
			<button type="submit">Sign up</button>
		</form>

		 <style>
            form {
                border: 1px solid black;
                padding: 1rem;
            }
        </style>
    `;
};
