import React from 'react';

import { GlobalFilter } from './GlobalFilter';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === 'light'
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
			  },
	title: {
		flex: '1 1 100%',
	},
	lastUpdated: {
    position:'absolute',
    right: 0
	},
}));

const TableToolbar = (props) => {
	const classes = useToolbarStyles();
	const { preGlobalFilteredRows, setGlobalFilter, globalFilter, lastUpdated } = props;

	return (
		<Toolbar className={classes.root}>
			<GlobalFilter
				preGlobalFilteredRows={preGlobalFilteredRows}
				globalFilter={globalFilter}
				setGlobalFilter={setGlobalFilter}
			/>
			<strong className={classes.lastUpdated}>
        Last Updated: {lastUpdated.slice(0,10)+' '+lastUpdated.slice(11,lastUpdated.length-5)}
      </strong>
		</Toolbar>
	);
};

export default TableToolbar;
