import React from 'react';
import { Grid, TextField } from '@material-ui/core';

export default function TextFieldMod({ Icon, ...props }) {
	return (
		<Grid container spacing={1} alignItems='flex-end' style={{ margin: '5px 0' }}>
			<Grid item>{Icon}</Grid>
			<Grid item style={{ width: '85%' }}>
				<TextField fullWidth {...props} />
			</Grid>
		</Grid>
	);
}
