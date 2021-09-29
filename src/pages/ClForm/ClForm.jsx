import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import PersonIcon from '@material-ui/icons/Person';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
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

export default function ClForm() {
	return (
		<Main>
			<Container>
				<div>
					<h3 style={{ textAlign: 'center' }}>Casual leave form</h3>
				</div>
				<FormContainer>
					<div>
						<TextField Icon={<PersonIcon />} label='Name' />
						<TextField Icon={<TodayIcon />} label='Designation' />
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								fullWidth
								margin='normal'
								id='date-picker-dialog'
								label='Date of application'
								format='MM/dd/yyyy'
								InputAdornmentProps={{ position: 'start' }}
								KeyboardButtonProps={{
									'aria-label': 'change date'
								}}
							/>
						</MuiPickersUtilsProvider>
						<TextField Icon={<TodayIcon />} label='Number of CL available' />
						<TextField Icon={<TodayIcon />} label='Number of days CL required' />
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
						<TextField Icon={<PersonIcon />} label='Communication Number' />
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
						<TextField Icon={<TodayIcon />} label='Your Email' />
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'>Mail to</InputLabel>
							<Select labelId='demo-simple-select-label' id='demo-simple-select'>
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
						justifyContent: 'center',
						alignItems: 'center',
						margin: '1rem auto'
					}}
				>
					<Button variant='contained' color='primary'>
						Submit
					</Button>
				</div>
			</Container>
		</Main>
	);
}
