import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography, TextField } from '@material-ui/core';

import { BgContainer, ButtonWithLoader, FlexContainer } from 'components';

import { handleChange } from 'functions';

export default function Login() {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		email: '',
		password: ''
	});

	const handleSubmit = async e => {
		e.preventDefault();
		if (loading) return;
		setLoading(true);
	};

	return (
		<BgContainer>
			<Box>
				<img src={'/images/staff.png'} alt='staff'></img>
				<Typography variant='h5' color='primary' style={{ fontWeight: '600' }}>
					LOGIN
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						label='Email'
						required
						name='email'
						type='email'
						value={data.email}
						onChange={handleChange(setData)}
					/>
					<TextField
						label='Password'
						required
						type='password'
						name='password'
						value={data.password}
						onChange={handleChange(setData)}
					/>
					<ButtonWithLoader loading={loading} text='LOGIN' />
				</form>
			</Box>
		</BgContainer>
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
