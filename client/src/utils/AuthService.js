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
		const res = await fetch('/auth/signup', {
			method: 'post',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return await res.json();
	},
	isAuthenticated: async (user) => {
		const res = await fetch('/auth/authenticated');
		const data = await res.json();
		return data;
	},
	logout: async () => {
		const res = await fetch('/auth/logout', {
			method: 'post',
		});
		const data = await res.json();
		return data;
	},
};

export default AuthService;
