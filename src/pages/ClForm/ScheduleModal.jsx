import React, { useEffect, useState } from 'react';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
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

import { Modal } from 'components';
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
	class: '',
	year: '',
	subject: ''
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
					date_hour: selectedDate.toISOString()
				}
			]);
		} else {
			setArrangement(old => {
				old[activeInd] = {
					...value,
					date_hour: selectedDate.toISOString()
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
			handleDateChange(new Date(arrangement[activeInd].date_hour));
			setData(arrangement[activeInd]);
		}
	}, [activeInd, arrangement]);

	const handleDelete = () => {
		setArrangement(old => old.filter((val, ind) => ind !== activeInd));
		setOpen(false);
	};

	return (
		<Modal {...{ open, setOpen }} title='Add Arrangement'>
			<form className={classes.root} onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDateTimePicker
						label='Date and Time'
						margin='normal'
						value={selectedDate}
						onChange={date => handleDateChange(date)}
						fullWidth
						minDate={new Date()}
					/>
				</MuiPickersUtilsProvider>
				<FormControl fullWidth>
					<InputLabel>Year</InputLabel>
					<Select
						value={formik.values.year}
						error={formik.errors['year'] && formik.touched['year']}
						{...formik.getFieldProps('year')}
					>
						<MenuItem value={''}>--Select--</MenuItem>
						<MenuItem value={1}>1 st</MenuItem>
						<MenuItem value={2}>2 nd</MenuItem>
						<MenuItem value={3}>3 rd</MenuItem>
						<MenuItem value={4}>4 th</MenuItem>
					</Select>
					{formik.errors['year'] && formik.touched['year'] && (
						<FormHelperText style={{ color: 'red' }}>{formik.errors['year']}</FormHelperText>
					)}
				</FormControl>
				<TextField
					label='Class'
					fullWidth
					placeholder='CSE B'
					helperText={formik.touched['class'] && formik.errors['class']}
					error={formik.errors['class'] && formik.touched['class']}
					value={formik.values.class}
					{...formik.getFieldProps('class')}
				/>
				<TextField
					label='Subject'
					fullWidth
					helperText={formik.touched['subject'] && formik.errors['subject']}
					error={formik.errors['subject'] && formik.touched['subject']}
					value={formik.values.subject}
					{...formik.getFieldProps('subject')}
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
