import React, { useState, useEffect, useMemo } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import { COLUMNS } from './columns';
import api from '../api';
import { GpuTable } from './GpuTable';

export const GpuContainer = () => {
  const [origData, setOrigData] = useState([]);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [skipPageReset, setSkipPageReset] = useState(false);

	const updateMyData = () => {
		// We also turn on the flag to not reset the page
		setSkipPageReset(true);
		// const newData = origData.filter((gpu) => {
		// 	const obj = JSON.parse(gpu);
		// 	const values = Object.keys(obj).map(function (key) {
		// 		return obj[key];
		// 	});
		// 	return values.find(a =>a.includes('asus')).length > 0
		// });
		// setData(newData);
	};

	useEffect(() => {
		setLoading(true);
		api
			.getAllGpus()
			.then((response) => {
				const data = response.data.map((gpu) => ({
					img: gpu.img,
					title: gpu.title,
					price: gpu.price,
					brand: gpu.brand,
					link: gpu.link,
					retailer: gpu.retailer,
				}));
        setData(data);
        setOrigData(data);
			})
			.catch((error) => {
				setData([]);
				console.log(error);
			})
			.finally(() => setLoading(false));
	}, []);

	const columns = useMemo(() => COLUMNS, []);

	if (data.length === 0 && !loading) {
		return <div>No GPU data available</div>;
	}

	return (
		<div>
			<CssBaseline />
			<GpuTable
				columns={columns}
				data={data}
				loading={loading}
				setData={setData}
				updateMyData={updateMyData}
				skipPageReset={skipPageReset}
			/>
		</div>
	);
};
