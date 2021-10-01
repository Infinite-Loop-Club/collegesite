import React, { useState } from 'react';
import { useFormik } from 'formik';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { Button, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import TodayIcon from '@material-ui/icons/Today';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import CreateIcon from '@material-ui/icons/Create';
import DateRangeIcon from '@material-ui/icons/DateRange';

import TextField from '../../component/TextField';
import WithIcon from '../../component/WithIcon';
import { Main, Container, FormContainer } from './styles';
import validationSchema from './validationSchema';
import AlternateArrangement from './AlternateArrangement';
import LeaveDays from './LeaveDays';

export default function ClForm() {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChange = date => {
		setSelectedDate(date);
	};

	const handleSubmit = event => {
		event.preventDefault();
		console.log('Submitted');
	};

	const formik = useFormik({
		initialValues: {
			name: '',
			designation: '',
			clAvailable: '',
			clRequired: '',
			email: '',
			mailTo: '',
			phoneNumber: ''
		},
		validationSchema: validationSchema,
		onSubmit: handleSubmit
	});

	return (
		<Main>
			<Container>
				<div>
					<h2 style={{ textAlign: 'center' }}>Casual leave form</h2>
				</div>
				<form onSubmit={formik.handleSubmit}>
					<FormContainer>
						<div>
							<TextField
								Icon={<PersonIcon />}
								label='Name'
								helperText={formik.touched['name'] && formik.errors['name']}
								error={formik.errors['name'] && formik.touched['name']}
								value={formik.values.name}
								{...formik.getFieldProps('name')}
							/>
							<TextField
								Icon={<BusinessCenterIcon />}
								label='Designation'
								helperText={formik.touched['designation'] && formik.errors['designation']}
								error={formik.errors['designation'] && formik.touched['designation']}
								value={formik.values.designation}
								{...formik.getFieldProps('designation')}
							/>
							<TextField
								Icon={<DateRangeIcon />}
								label='No of CL available'
								helperText={formik.touched['clAvailable'] && formik.errors['clAvailable']}
								error={formik.errors['clAvailable'] && formik.touched['clAvailable']}
								value={formik.values.clAvailable}
								{...formik.getFieldProps('clAvailable')}
							/>
							<TextField
								Icon={<PhoneIphoneIcon />}
								label='Communication Number'
								helperText={formik.touched['phoneNumber'] && formik.errors['phoneNumber']}
								error={formik.errors['phoneNumber'] && formik.touched['phoneNumber']}
								value={formik.values.phoneNumber}
								{...formik.getFieldProps('phoneNumber')}
							/>
							<TextField
								Icon={<MailIcon />}
								label='Your Email'
								helperText={formik.touched['email'] && formik.errors['email']}
								error={formik.errors['email'] && formik.touched['email']}
								value={formik.values.email}
								{...formik.getFieldProps('email')}
							/>
							<WithIcon Icon={<AlternateEmailIcon />}>
								<FormControl fullWidth>
									<InputLabel>Mail to</InputLabel>
									<Select value={formik.values.mailTo} {...formik.getFieldProps('mailTo')}>
										<MenuItem value={'mail1@email.com'}>mail1@email.com</MenuItem>
										<MenuItem value={'mail2@email.com'}>mail2@email.com</MenuItem>
										<MenuItem value={'mail3@email.com'}>mail3@email.com</MenuItem>
									</Select>
								</FormControl>
							</WithIcon>
							<TextField Icon={<CreateIcon />} label='Reason' multiline rows={4} />
						</div>
						<div>
							<TextField
								Icon={<TodayIcon />}
								label='No of days CL required'
								helperText={formik.touched['clRequired'] && formik.errors['clRequired']}
								error={formik.errors['clRequired'] && formik.touched['clRequired']}
								value={formik.values.clRequired}
								{...formik.getFieldProps('clRequired')}
							/>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<WithIcon Icon={<TodayIcon />}>
									<DatePicker
										margin='normal'
										fullWidth
										label='Days of CL'
										format='MM/dd/yyyy'
										value={selectedDate}
										onChange={handleDateChange}
										minDate={new Date()}
									/>
								</WithIcon>
							</MuiPickersUtilsProvider>
							<LeaveDays />
							<AlternateArrangement />
						</div>
					</FormContainer>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							margin: '1rem'
						}}
					>
						<Button variant='contained' color='primary' type='submit'>
							Submit
						</Button>
					</div>
				</form>
			</Container>
		</Main>
	);
}
