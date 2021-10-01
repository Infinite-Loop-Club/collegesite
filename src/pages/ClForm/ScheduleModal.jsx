import React, { useEffect, useState } from 'react';
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

const INIT_DATA = {
	hour: '',
	class: '',
	year: '',
	subject: '',
	faculty: ''
};

export default function ScheduleModal({
	open,
	setOpen,
	arrangement,
	setArrangement,
	activeInd,
	setActiveInd
}) {
	const classes = useStyles();
	const [selectedDate, handleDateChange] = useState(new Date());
	const [data, setData] = useState(INIT_DATA);

	const handleSubmit = value => {
		if (activeInd === -1) {
			setArrangement(old => [
				...old,
				{
					...value,
					timing: selectedDate.toISOString()
				}
			]);
		} else {
			setArrangement(old => {
				old[activeInd] = {
					...value,
					timing: selectedDate.toISOString()
				};
				return [...old];
			});
		}

		setData(INIT_DATA);
		setOpen(false);
	};

	const formik = useFormik({
		initialValues: data,
		enableReinitialize: true,
		validationSchema: scheduleValidation,
		onSubmit: handleSubmit
	});

	useEffect(() => {
		if (activeInd === -1) {
			setData(INIT_DATA);
		} else {
			handleDateChange(new Date(arrangement[activeInd].timing));
			setData(arrangement[activeInd]);
		}
	}, [activeInd]);

	const handleDelete = () => {
		setArrangement(old => old.filter((val, ind) => ind !== activeInd));
		setOpen(false);
	};

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
					<KeyboardTimePicker
						label='Timing'
						margin='normal'
						value={selectedDate}
						onChange={date => handleDateChange(date)}
						fullWidth
					/>
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
					{activeInd !== -1 && (
						<Button
							variant='outlined'
							color='primary'
							onClick={handleDelete}
							style={{ marginRight: '10px' }}
						>
							Delete
						</Button>
					)}
					<Button type='submit' variant='contained' color='primary'>
						{activeInd === -1 ? 'Add' : 'Update'}
					</Button>
				</Box>
			</form>
		</Modal>
	);
}
