const GpuService = {
	getSaved: async () => {
		const res = await fetch('/auth/saved');

		res = await res.json();

		if (res.status == 401) {
			return { saved: null, message: 'Unauthorized' };
		} else {
			return res;
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

		res = await res.json();

		if (res.status == 401) {
			return { saved: null, message: 'Unauthorized' };
		} else {
			return res;
		}
	},
};

export default GpuService;
