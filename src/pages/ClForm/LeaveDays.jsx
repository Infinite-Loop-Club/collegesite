import React, { Fragment, useState } from 'react';
import {
	Paper,
	TableRow,
	TableContainer,
	TableCell,
	TableBody,
	Table,
	IconButton,
	Button,
	Box
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@material-ui/core/Dialog';
import { format, addDays } from 'date-fns';

import DeleteIcon from '@material-ui/icons/Delete';
import { FlexDiv } from './styles';

export default function LeaveDays({ dates, setDates, formik }) {
	const [open, setOpen] = useState(false);
	const [activeInd, setActiveInd] = useState(-1);
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChange = date => {
		setSelectedDate(date);
	};

	const handleClose = () => {
		setDates(old => {
			if (activeInd === -1) return [...new Set([...old, selectedDate.toDateString()])];
			old[activeInd] = selectedDate.toDateString();
			return [...new Set(old)];
		});
		setOpen(false);
	};

	return (
		<Fragment>
			<div style={{ margin: '2rem auto' }}>
				<FlexDiv style={{ marginBottom: '5px' }}>
					<h3>CL Days</h3>
					{dates.length < formik.values.no_of_days && (
						<Button
							size='small'
							variant='contained'
							color='secondary'
							onClick={() => {
								setActiveInd(-1);
								setSelectedDate(
									dates.length === 0 ? new Date() : addDays(new Date(dates[dates.length - 1]), 1)
								);
								setOpen(true);
							}}
						>
							Add
						</Button>
					)}
				</FlexDiv>
				<TableContainer component={Paper}>
					<Table>
						<TableBody>
							{dates.map((val, ind) => {
								return (
									<TableRow key={ind}>
										<TableCell component='th' scope='row'>
											{ind + 1}
										</TableCell>
										<TableCell
											style={{ cursor: 'pointer' }}
											onClick={() => {
												setActiveInd(ind);
												setSelectedDate(new Date(dates[ind]));
												setOpen(true);
											}}
										>
											{format(new Date(val), 'dd - MM -yyyy')}
										</TableCell>
										<TableCell>
											<IconButton onClick={() => setDates(old => old.filter((v, i) => i !== ind))}>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					{dates.length === 0 && <h5 style={{ margin: '10px', textAlign: 'center' }}>NOT ADDED</h5>}
				</TableContainer>
			</div>
			<Dialog onClose={handleClose} aria-labelledby='simple-dialog-title' open={open}>
				<div style={{ padding: '1.5em' }}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							margin='normal'
							fullWidth
							format='dd/MM/yyyy'
							value={selectedDate}
							onChange={handleDateChange}
							minDate={new Date()}
						/>
					</MuiPickersUtilsProvider>
					<Box display='flex' justifyContent='flex-end' mt={2}>
						<Button variant='contained' size='small' color='primary' onClick={handleClose}>
							Add
						</Button>
					</Box>
				</div>
			</Dialog>
		</Fragment>
	);
}
