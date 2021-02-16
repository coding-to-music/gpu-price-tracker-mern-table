import React, { useState, useEffect, useMemo, useContext } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import { COLUMNS } from './columns/columns';
import { getAllGpus, getLastUpdatedDate } from '../../api';
import { GpuTable } from './GpuTable';
import { AuthContext } from '../../utils/AuthContext';
import GpuService from '../../utils/GpuService';

const GpuContainer = (props) => {
	const [data, setData] = useState([]);
	const [allData, setAllData] = useState([]);
	const [savedData, setSavedData] = useState([]);
	const [saved, setSaved] = useState([]);
	const [lastUpdated, setLastUpdated] = useState('');
	const [skipPageReset, setSkipPageReset] = useState(false);

	const { user, setUser, authenticated, setAuthenticated } = useContext(
		AuthContext
	);

	const updateMyData = () => {
		setSkipPageReset(true);
	};

	useEffect(() => {
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
				setAllData(data);
			})
			.catch((error) => {
				setData([]);
				console.log(error);
			});

		getLastUpdatedDate()
			.then((response) => {
				setLastUpdated(response.data);
			})
			.catch((error) => {
				console.log(error);
			});

		GpuService.getSaved()
			.then(({ saved }) => {
				setSaved(saved);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleSaved = () => {
		var savedArr = [];

		saved.forEach((id) => savedArr.push(data.find((item) => item.id === id)));

		if (savedArr[0] !== undefined) {
			setSavedData(savedArr);
      setData(savedData);
		}
	};

	useEffect(() => {
		if (props.saved) {
			handleSaved();
		} else {
      setData(allData);
    }
	}, [props.saved, saved]);

	const columns = useMemo(() => COLUMNS, []);

	return (
		<div>
			<CssBaseline />
			<GpuTable
				columns={columns}
				data={data}
				updateMyData={updateMyData}
				skipPageReset={skipPageReset}
				lastUpdated={lastUpdated}
			/>
		</div>
	);
};

export default GpuContainer;
