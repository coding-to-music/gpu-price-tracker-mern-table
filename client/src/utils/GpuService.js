const GpuService = {
	getSaved: async () => {
		const res = await fetch('/auth/saved');

		if (res.status === 401) {
			return { saved: null, message: 'Unauthorized' };
		} else {
			const data = await res.json();
			return data;
		}
	},
	save: async (id) => {
		const res = await fetch('/auth/save', {
			method: 'post',
			body: JSON.stringify(id),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (res.status === 401) {
			return { saved: null, message: 'Unauthorized' };
		} else {
			const data = await res.json();
			return data;
		}
	},
};

export default GpuService;
