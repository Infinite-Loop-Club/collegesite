import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import 'date-fns';
import {
	Button,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	FormHelperText,
	Snackbar,
	Paper,
	FormLabel,
	Radio,
	RadioGroup,
	FormControlLabel
} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import TodayIcon from '@material-ui/icons/Today';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import CreateIcon from '@material-ui/icons/Create';
import DateRangeIcon from '@material-ui/icons/DateRange';

import { TextField, WithIcon, Loader, Alert } from 'components';
import { Main, Container, FormContainer, FlexDiv } from './styles';
import { clFormValidation } from './validationSchema';
import AlternateArrangement from './AlternateArrangement';
import LeaveDays from './LeaveDays';
import Address from './Address';

export default function ClForm() {
	const [dates, setDates] = useState([]);
	const [arrangement, setArrangement] = useState([]);
	const [address, setAddress] = useState(null);
	const [loading, setLoading] = useState(false);
	const [openAddress, setOpenAddress] = useState(false);
	const [success, setSuccess] = useState(false);
	const [alert, setAlert] = useState({
		open: false,
		message: ''
	});

	const handleSubmit = async value => {
		if (value.no_of_days !== dates.length) {
			return setAlert({
				open: true,
				message: 'please add CL days !'
			});
		} else if (!address) {
			return setAlert({
				open: true,
				message: 'please add your address !'
			});
		} else if (arrangement.length === 0) {
			return setAlert({
				open: true,
				message: 'please add arrangement !'
			});
		}
		setLoading(true);

		try {
			const config = {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('aubit_token')}`
				}
			};
			await axios.post(
				'/api/apply-cl',
				{
					basic: {
						...value,
						country_code: '91',
						nature_of_leave: value.nature_of_leave === 'true' ? 1 : 0
					},
					arrangements: arrangement,
					dates,
					address: {
						...address,
						country: 'India'
					}
				},
				config
			);
			setSuccess(true);
			setLoading(false);
		} catch (error) {
			setAlert({
				open: true,
				message:
					error?.response?.data?.message ?? 'Something went wrong ! Please try again later 😪'
			});
			setLoading(false);
		}
	};

	const formik = useFormik({
		initialValues: {
			name: '',
			designation: '',
			availed_days: '',
			no_of_days: '',
			department_name: '',
			semester_type: '',
			phone_number: '',
			purpose_description: '',
			nature_of_leave: 'false'
		},
		validationSchema: clFormValidation,
		onSubmit: handleSubmit
	});

	const handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlert({
			open: false,
			message: ''
		});
	};

	return (
		<Main>
			<Container>
				<div>
					<h2 style={{ textAlign: 'center' }}>Casual leave form</h2>
				</div>
				{loading ? (
					<Loader />
				) : success ? (
					<h4 style={{ textAlign: 'center', margin: '30px 0' }}>
						Your response has been submitted successfully ✔
					</h4>
				) : (
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
									inputProps={{ min: 1, max: 50 }}
									type='number'
									helperText={formik.touched['availed_days'] && formik.errors['availed_days']}
									error={formik.errors['availed_days'] && formik.touched['availed_days']}
									value={formik.values.availed_days}
									{...formik.getFieldProps('availed_days')}
								/>
								<TextField
									Icon={<PhoneIphoneIcon />}
									label='Communication Number'
									helperText={formik.touched['phone_number'] && formik.errors['phone_number']}
									error={formik.errors['phone_number'] && formik.touched['phone_number']}
									value={formik.values.phone_number}
									{...formik.getFieldProps('phone_number')}
								/>
								<TextField
									Icon={<AccountBalanceIcon />}
									label='Department Name'
									helperText={formik.touched['department_name'] && formik.errors['department_name']}
									error={formik.errors['department_name'] && formik.touched['department_name']}
									value={formik.values.department_name}
									{...formik.getFieldProps('department_name')}
								/>
								<WithIcon Icon={<MenuBookIcon />}>
									<FormControl fullWidth>
										<InputLabel>Semester Type</InputLabel>
										<Select
											value={formik.values.semester_type}
											error={formik.errors['semester_type'] && formik.touched['semester_type']}
											{...formik.getFieldProps('semester_type')}
										>
											<MenuItem value={''}>--Select--</MenuItem>
											<MenuItem value={'odd'}>ODD</MenuItem>
											<MenuItem value={'even'}>EVEN</MenuItem>
										</Select>
										{formik.errors['semester_type'] && formik.touched['semester_type'] && (
											<FormHelperText style={{ color: 'red' }}>
												{formik.errors['semester_type']}
											</FormHelperText>
										)}
									</FormControl>
								</WithIcon>
								<TextField
									Icon={<CreateIcon />}
									{...formik.getFieldProps('purpose_description')}
									label='Purpose'
									multiline
									rows={4}
								/>
								<Paper style={{ padding: '1em' }}>
									<FlexDiv style={{ marginBottom: '5px' }}>
										<h3>Address</h3>
										<Button
											size='small'
											variant='contained'
											color='secondary'
											onClick={() => {
												setOpenAddress(true);
											}}
										>
											{address ? 'Edit' : 'Add'}
										</Button>
									</FlexDiv>
									<div>
										{!address ? (
											<p style={{ margin: '10px 0', textAlign: 'center' }}>NOT ADDED</p>
										) : (
											<>
												<p>{address?.line1},</p>
												<p>{address?.line2},</p>
												<p>
													{address?.state},{address?.city} - {address?.postal_code}
												</p>
											</>
										)}
									</div>
								</Paper>
							</div>
							<div>
								<FormControl component='fieldset' style={{ width: '100%', marginTop: '20px' }}>
									<FormLabel component='legend'>Nature of Leave</FormLabel>
									<RadioGroup
										{...formik.getFieldProps('nature_of_leave')}
										style={{ display: 'flex', flexDirection: 'row' }}
									>
										<FormControlLabel value={'true'} control={<Radio />} label='Yes' />
										<FormControlLabel value={'false'} control={<Radio />} label='No' />
									</RadioGroup>
								</FormControl>
								<TextField
									Icon={<TodayIcon />}
									type='number'
									label='No of days CL required'
									inputProps={{ min: 1, max: 50 }}
									helperText={formik.touched['no_of_days'] && formik.errors['no_of_days']}
									error={formik.errors['no_of_days'] && formik.touched['no_of_days']}
									value={formik.values.no_of_days}
									{...formik.getFieldProps('no_of_days')}
								/>
								<LeaveDays {...{ dates, setDates, formik }} />
								<AlternateArrangement {...{ arrangement, setArrangement }} />
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
				)}
			</Container>
			<Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
				<Alert onClose={handleCloseAlert} severity='error'>
					{alert.message}
				</Alert>
			</Snackbar>
			<Address open={openAddress} setOpen={setOpenAddress} {...{ address, setAddress }} />
		</Main>
	);
}
