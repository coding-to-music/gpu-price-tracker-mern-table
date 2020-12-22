import React, { useState, useEffect, useMemo } from 'react';

import { COLUMNS } from './columns';
import api from '../api';
import { GpuTable } from './GpuTable';

export const GpuContainer = () => {
	const [gpuData, setGpuData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		api
			.getAllGpus()
			.then((response) => {
				const data = response.data;
				const gpuData = data.map((gpu) => ({
					img: gpu.img,
					title: gpu.title,
					price: gpu.price,
					brand: gpu.brand,
					retailer: gpu.retailer,
				}));
				setGpuData(gpuData);
			})
			.catch((error) => {
				setGpuData([]);
				console.log(error);
			})
			.finally(() => setLoading(false));
	}, []);

  const columns = useMemo(() => COLUMNS, []);

	if (gpuData.length === 0 && !loading) {
		return <div>No GPU data available</div>;
	}

	return (
		<div>
			{loading && <span>Fetching...</span>}
			<GpuTable columns={columns} data={gpuData} />
		</div>
	);
};
