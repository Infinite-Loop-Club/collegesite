import React from 'react';
import { useFormik } from 'formik';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import PersonIcon from '@material-ui/icons/Person';
import TodayIcon from '@material-ui/icons/Today';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
	KeyboardTimePicker
} from '@material-ui/pickers';
import {
	Paper,
	TableRow,
	TableHead,
	TableContainer,
	TableCell,
	TableBody,
	Table,
	Button,
	InputLabel,
	MenuItem,
	FormControl,
	Select
} from '@material-ui/core';

import TextField from '../../component/TextField';
import { Main, Container, FormContainer } from './styles';
import validationSchema from './validationSchema';

export default function ClForm() {
	const handleSubmit = event => {
		event.preventDefault();
		console.log('Submitted');
	};

	const formik = useFormik({
		initialValues: {
			name: '',
			designation: '',
			dateOfApplication: '',
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
								Icon={<TodayIcon />}
								label='Designation'
								helperText={formik.touched['designation'] && formik.errors['designation']}
								error={formik.errors['designation'] && formik.touched['designation']}
								value={formik.values.designation}
								{...formik.getFieldProps('designation')}
							/>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									fullWidth
									margin='normal'
									id='dateOfApplication'
									label='Date of application'
									format='MM/dd/yyyy'
									InputAdornmentProps={{ position: 'start' }}
									KeyboardButtonProps={{
										'aria-label': 'change date'
									}}
								/>
							</MuiPickersUtilsProvider>
							<TextField
								Icon={<TodayIcon />}
								label='Number of CL available'
								helperText={formik.touched['clAvailable'] && formik.errors['clAvailable']}
								error={formik.errors['clAvailable'] && formik.touched['clAvailable']}
								value={formik.values.clAvailable}
								{...formik.getFieldProps('clAvailable')}
							/>
							<TextField
								Icon={<TodayIcon />}
								label='Number of days CL required'
								helperText={formik.touched['clRequired'] && formik.errors['clRequired']}
								error={formik.errors['clRequired'] && formik.touched['clRequired']}
								value={formik.values.clRequired}
								{...formik.getFieldProps('clRequired')}
							/>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									margin='normal'
									fullWidth
									id='date-picker-dialog'
									label='Days of CL'
									format='MM/dd/yyyy'
									InputAdornmentProps={{ position: 'start' }}
									KeyboardButtonProps={{
										'aria-label': 'change date'
									}}
								/>
							</MuiPickersUtilsProvider>
							<TextField id='outlined-multiline-static' label='Reason' multiline rows={4} />
						</div>
						<div>
							<TextField
								Icon={<PersonIcon />}
								label='Communication Number'
								helperText={formik.touched['phoneNumber'] && formik.errors['phoneNumber']}
								error={formik.errors['phoneNumber'] && formik.touched['phoneNumber']}
								value={formik.values.phoneNumber}
								{...formik.getFieldProps('phoneNumber')}
							/>
							<div style={{ margin: '2rem auto' }}>
								<h3 style={{ textAlign: 'center' }}>Alternate Arrangement</h3>
								<TableContainer component={Paper}>
									<Table aria-label='simple table'>
										<TableHead>
											<TableRow>
												<TableCell>S.No</TableCell>
												<TableCell>Hour</TableCell>
												<TableCell>Time</TableCell>
												<TableCell>Class</TableCell>
												<TableCell>Subject</TableCell>
												<TableCell>Faculty</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow>
												<TableCell component='th' scope='row'>
													1
												</TableCell>
												<TableCell>
													<TextField id='hour' placeholder='hour' />
												</TableCell>
												<TableCell>
													<MuiPickersUtilsProvider utils={DateFnsUtils}>
														<KeyboardTimePicker
															margin='normal'
															id='time-picker'
															KeyboardButtonProps={{
																'aria-label': 'change time'
															}}
														/>
													</MuiPickersUtilsProvider>
												</TableCell>
												<TableCell>
													<TextField id='class' placeholder='class' />
												</TableCell>
												<TableCell>
													<TextField id='subject' placeholder='subject' />
												</TableCell>
												<TableCell>
													<TextField id='faculty' placeholder='faculty' />
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</div>
							<TextField
								Icon={<TodayIcon />}
								label='Your Email'
								helperText={formik.touched['email'] && formik.errors['email']}
								error={formik.errors['email'] && formik.touched['email']}
								value={formik.values.email}
								{...formik.getFieldProps('email')}
							/>
							<FormControl fullWidth>
								<InputLabel id='demo-simple-select-label'>Mail to</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={formik.values.mailTo}
									{...formik.getFieldProps('mailTo')}
								>
									<MenuItem value={'mail1@email.com'}>mail1@email.com</MenuItem>
									<MenuItem value={'mail2@email.com'}>mail2@email.com</MenuItem>
									<MenuItem value={'mail3@email.com'}>mail3@email.com</MenuItem>
								</Select>
							</FormControl>
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
