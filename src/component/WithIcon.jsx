import React from 'react';
import { Grid } from '@material-ui/core';

export default function WithIcon({ Icon, children }) {
	return (
		<Grid container spacing={1} alignItems='flex-end' style={{ margin: '5px 0' }}>
			<Grid item>{Icon}</Grid>
			<Grid item style={{ width: '85%' }}>
				{children}
			</Grid>
		</Grid>
	);
}
