import React, { useState, useEffect, useMemo } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import { COLUMNS } from './columns/columns';
import { getAllGpus, getLastUpdatedDate } from '../../api';
import { GpuTable } from './GpuTable';

export const GpuContainer = (props) => {
	const [data, setData] = useState([]);
	const [localData, setLocalData] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [lastUpdated, setLastUpdated] = useState('');
	const [skipPageReset, setSkipPageReset] = useState(false);

	const updateMyData = () => {
		setSkipPageReset(true);
	};

	const handleSaved = (data) => {
		const keys = Object.keys(localStorage);
		const local = [];

		keys.forEach((key) => local.push(data.find((item) => item.id == key)));

		setLocalData(local);
	};

	useEffect(() => {
		if (data.length === 0)
			getAllGpus()
				.then((response) => {
					var data = response.data.map((gpu) => ({
						id: gpu._id,
						img: gpu.img,
						title: gpu.title,
						price: gpu.price,
						brand: gpu.brand,
						link: gpu.link,
						retailer: gpu.retailer,
					}));
					setData(data);

					handleSaved(data);
				})
				.catch((error) => {
					setData([]);
					console.log(error);
				});

		if (lastUpdated === '')
			getLastUpdatedDate()
				.then((response) => {
					setLastUpdated(response.data);
				})
				.catch((error) => {
					console.log(error);
        });
        
    if (data.length !== 0 && Object.keys(localStorage).length !== localData.length) {
      handleSaved(data)
    }

		props.saved ? setTableData(localData) : setTableData(data);
	}, [data, localData, props.saved]);

	const columns = useMemo(() => COLUMNS, []);

	return (
		<div>
			<CssBaseline />
			<GpuTable
				columns={columns}
				data={tableData}
				updateMyData={updateMyData}
				skipPageReset={skipPageReset}
				lastUpdated={lastUpdated}
			/>
		</div>
	);
};
