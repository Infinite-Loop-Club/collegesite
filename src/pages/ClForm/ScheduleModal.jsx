import React from 'react';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
	TextField,
	Button,
	Box,
	Select,
	InputLabel,
	MenuItem,
	FormControl,
	FormHelperText
} from '@material-ui/core';
import { useFormik } from 'formik';

import Modal from '../../component/Modal';
import { scheduleValidation } from './validationSchema';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1)
		}
	}
}));

export default function ScheduleModal({ open, setOpen }) {
	const classes = useStyles();

	const handleSubmit = () => {
		console.log('Submitted');
		setOpen(false);
	};

	const formik = useFormik({
		initialValues: {
			hour: '',
			class: '',
			year: '',
			subject: '',
			faculty: ''
		},
		validationSchema: scheduleValidation,
		onSubmit: handleSubmit
	});

	return (
		<Modal {...{ open, setOpen }} title='Add Arrangement'>
			<form className={classes.root} onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
				<TextField
					label='Hour'
					fullWidth
					helperText={formik.touched['hour'] && formik.errors['hour']}
					error={formik.errors['hour'] && formik.touched['hour']}
					value={formik.values.hour}
					{...formik.getFieldProps('hour')}
				/>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardTimePicker label='Timing' margin='normal' fullWidth />
				</MuiPickersUtilsProvider>
				<TextField
					label='Class'
					fullWidth
					helperText={formik.touched['class'] && formik.errors['class']}
					error={formik.errors['class'] && formik.touched['class']}
					value={formik.values.class}
					{...formik.getFieldProps('class')}
				/>
				<FormControl fullWidth>
					<InputLabel>Year</InputLabel>
					<Select
						value={formik.values.year}
						error={formik.errors['year'] && formik.touched['year']}
						{...formik.getFieldProps('year')}
					>
						<MenuItem value={''}>--Select--</MenuItem>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
						<MenuItem value={3}>3</MenuItem>
						<MenuItem value={4}>4</MenuItem>
					</Select>
					{formik.errors['year'] && formik.touched['year'] && (
						<FormHelperText style={{ color: 'red' }}>{formik.errors['year']}</FormHelperText>
					)}
				</FormControl>
				<TextField
					label='Subject'
					fullWidth
					helperText={formik.touched['subject'] && formik.errors['subject']}
					error={formik.errors['subject'] && formik.touched['subject']}
					value={formik.values.subject}
					{...formik.getFieldProps('subject')}
				/>
				<TextField
					label='Faculty'
					fullWidth
					helperText={formik.touched['faculty'] && formik.errors['faculty']}
					error={formik.errors['faculty'] && formik.touched['faculty']}
					value={formik.values.faculty}
					{...formik.getFieldProps('faculty')}
				/>
				<Box display='flex' justifyContent='flex-end' mt={2}>
					<Button
						variant='outlined'
						color='primary'
						onClick={() => setOpen(false)}
						style={{ marginRight: '10px' }}
					>
						Cancel
					</Button>
					<Button type='submit' variant='contained' color='primary'>
						Add
					</Button>
				</Box>
			</form>
		</Modal>
	);
}
