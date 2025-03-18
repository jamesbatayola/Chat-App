export const loadLoginPage = () => {
	return `
        <form class="login-form" action="">
            <h1>Login</h1>
            <div>
                <label for="">email</label>
                <input class="email-input" type="text" />
            </div>
            <div>
                <label for="">password</label>
                <input class="password-input" type="text" />
            </div>
            <button type="submit">Login</button>
        </form>
    `;
};
