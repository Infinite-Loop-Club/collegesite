import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography, TextField, Snackbar } from '@material-ui/core';
import OtpInput from 'react-otp-input-rc-17';
import axios from 'axios';

import { BgContainer, ButtonWithLoader, FlexContainer, Alert } from 'components';

import { handleChange } from 'functions';

export default function Login({ setIsLoggedIn }) {
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState(1);
	const [data, setData] = useState({
		email: '',
		otp: ''
	});
	const [alert, setAlert] = useState({
		open: false,
		type: 'success',
		message: ''
	});

	const handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlert({
			open: false,
			type: 'success',
			message: ''
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();
		if (loading) return;
		setLoading(true);
		try {
			const res = await axios.post('/api/verify', {
				email: data.email,
				code: data.otp
			});
			localStorage.setItem('aubit_token', res.data?.data?.token);
			setLoading(false);
			setAlert({
				open: true,
				type: 'success',
				message: 'Verification success !'
			});
			setIsLoggedIn(true);
		} catch (error) {
			setAlert({
				open: true,
				type: 'error',
				message:
					error?.response?.data?.message ?? 'Something went wrong ! Please try again later 😪'
			});
			setLoading(false);
		}
		console.log(data);
	};

	const handleEmailSubmit = async e => {
		e.preventDefault();
		if (loading) return;
		setLoading(true);
		try {
			await axios.post('/api/login', {
				email: data.email
			});
			setLoading(false);
			setAlert({
				open: true,
				type: 'success',
				message: 'OTP send successfully !'
			});
			setStep(2);
		} catch (error) {
			setAlert({
				open: true,
				type: 'error',
				message:
					error?.response?.data?.message ?? 'Something went wrong ! Please try again later 😪'
			});
			setLoading(false);
		}
	};

	return (
		<>
			<BgContainer>
				<Box>
					<img src={'/images/staff.png'} alt='staff'></img>
					<Typography variant='h5' color='primary' style={{ fontWeight: '600' }}>
						{step === 1 ? 'LOGIN' : 'OTP'}
					</Typography>
					{step === 1 ? (
						<form onSubmit={handleEmailSubmit}>
							<TextField
								label='Email'
								required
								name='email'
								type='email'
								value={data.email}
								onChange={handleChange(setData)}
							/>
							<ButtonWithLoader loading={loading} text='Next' />
						</form>
					) : (
						<Form onSubmit={handleSubmit}>
							<OtpInput
								value={data.otp}
								onChange={otp => setData(old => ({ ...old, otp }))}
								numInputs={6}
								separator={<span>-</span>}
								containerStyle={{
									justifyContent: 'center',
									margin: '1em'
								}}
								isInputNum
							/>
							<ButtonWithLoader loading={loading} text='Submit' />
						</Form>
					)}
				</Box>
			</BgContainer>
			<Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
				<Alert onClose={handleCloseAlert} severity={alert.type}>
					{alert.message}
				</Alert>
			</Snackbar>
		</>
	);
}

const Box = styled(FlexContainer)`
	flex-direction: column;
	min-width: 35rem;
	padding: 2em;
	border-radius: 1em;
	background-color: ${p => p.theme.white};
	box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
	@media only screen and (max-width: 600px) {
		min-width: auto;
		width: 94%;
	}
	form {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	img {
		width: 4rem;
		display: inline-block;
	}
	h5 {
		margin: 1rem 0;
	}
	button {
		margin: 1rem 0;
	}
`;

const Form = styled.form`
	input {
		font-size: 1.8em;
		width: 2em !important;

		@media (max-width: 600px) {
			font-size: 1.2em;
			width: 1.5em !important;
		}
	}
`;
