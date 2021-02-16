import React, { useState, useEffect, useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { AuthContext } from '../../utils/AuthContext';

const PlusCheckbox = (props) => {
	const { row } = props;
	const [checked, setChecked] = useState(false);
	const { user, setUser, authenticated, setAuthenticated } = useContext(
		AuthContext
	);

	useEffect(() => {
		setChecked(!!localStorage.getItem(row.original.id));
	}, [row]);

	const handleSaveData = (data) => {
		localStorage.getItem(data.id) == null
			? localStorage.setItem(data.id, JSON.stringify(data))
			: localStorage.removeItem(data.id);

		setChecked(localStorage.getItem(row.original.id) !== null);
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
