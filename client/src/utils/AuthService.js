const AuthService = {
	login: async (user) => {
		const res = await fetch('/auth/login', {
			method: 'post',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return await res.json();
	},
	register: async (user) => {
		const res = await fetch('/auth/register', {
			method: 'post',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return await res.json();
	},
	isAuthenticated: async (user) => {
		const res = await fetch('/auth/login', {
			method: 'post',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return await res.json();
	},
};

export default AuthService;
