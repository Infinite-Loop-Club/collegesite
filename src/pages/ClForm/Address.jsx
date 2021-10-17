import React from 'react';
import { TextField, Button, Box } from '@material-ui/core';
import { useFormik } from 'formik';

import { Modal } from 'components';
import { addressValidation } from './validationSchema';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1)
		}
	}
}));

export default function Address({ open, setOpen, address, setAddress }) {
	const classes = useStyles();

	const handleSubmit = value => {
		setAddress(value);
		setOpen(false);
	};

	const formik = useFormik({
		initialValues: {
			line1: '',
			line2: '',
			city: '',
			state: '',
			postal_code: ''
		},
		validationSchema: addressValidation,
		onSubmit: handleSubmit
	});

	return (
		<Modal {...{ open, setOpen }} title='Add Address'>
			<form className={classes.root} onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
				<TextField
					label='Line 1'
					fullWidth
					helperText={formik.touched['line1'] && formik.errors['line1']}
					error={formik.errors['line1'] && formik.touched['line1']}
					value={formik.values.line1}
					{...formik.getFieldProps('line1')}
				/>
				<TextField
					label='Line 2'
					fullWidth
					helperText={formik.touched['line2'] && formik.errors['line2']}
					error={formik.errors['line2'] && formik.touched['line2']}
					value={formik.values.line2}
					{...formik.getFieldProps('line2')}
				/>
				<TextField
					label='City'
					fullWidth
					helperText={formik.touched['city'] && formik.errors['city']}
					error={formik.errors['city'] && formik.touched['city']}
					value={formik.values.city}
					{...formik.getFieldProps('city')}
				/>
				<TextField
					label='State'
					fullWidth
					helperText={formik.touched['state'] && formik.errors['state']}
					error={formik.errors['state'] && formik.touched['state']}
					value={formik.values.state}
					{...formik.getFieldProps('state')}
				/>
				<TextField
					label='Postal Code'
					fullWidth
					type='number'
					helperText={formik.touched['postal_code'] && formik.errors['postal_code']}
					error={formik.errors['postal_code'] && formik.touched['postal_code']}
					value={formik.values.postal_code}
					{...formik.getFieldProps('postal_code')}
				/>

				<Box display='flex' justifyContent='flex-end' mt={2}>
					<Button type='submit' variant='contained' color='primary'>
						Add
					</Button>
				</Box>
			</form>
		</Modal>
	);
}
