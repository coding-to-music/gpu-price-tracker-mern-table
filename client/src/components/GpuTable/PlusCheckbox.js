import React, { useState, useEffect, useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { AuthContext } from '../../utils/AuthContext';
import GpuService from '../../utils/GpuService';

const PlusCheckbox = (props) => {
	const { row } = props;
	const [checked, setChecked] = useState(false);
	const { user, setUser, authenticated, setAuthenticated } = useContext(
		AuthContext
	);

	useEffect(() => {
		if (authenticated)
			GpuService.getSaved().then(({ saved }) => {
				setChecked(saved.includes(row.original.id));
			});
	}, [row]);

	const handleSaveData = async (data) => {
		if (authenticated) {
			if (!checked) {
				const res = await GpuService.save({ id: data.id });
				if (res.id !== null) {
					setChecked(!checked);
				}
			} else {
				const res = await GpuService.delete({ id: data.id });
				if (res.id !== null) {
          console.log(res);
					setChecked(!checked);
				}
			}
		}
	};

	return authenticated ? (
		<div
			style={{
				transform: 'translate(+20%, +40%)',
			}}
		>
			<Checkbox
				icon={
					<AddIcon
						style={{ color: '#4caf50', width: '40px', height: '40px' }}
					/>
				}
				checkedIcon={<RemoveIcon style={{ width: '40px', height: '40px' }} />}
				onChange={(e) => handleSaveData(row.original)}
				checked={checked}
			/>
		</div>
	) : (
		<></>
	);
};

export default PlusCheckbox;
