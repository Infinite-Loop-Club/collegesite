import React, { Fragment, useState } from 'react';
import {
	Paper,
	TableRow,
	TableContainer,
	TableCell,
	TableBody,
	Table,
	IconButton,
	Button
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@material-ui/core/Dialog';
import { format, addDays } from 'date-fns';

import DeleteIcon from '@material-ui/icons/Delete';
import { FlexDiv } from './styles';

export default function LeaveDays({ days, setDays, formik }) {
	const [open, setOpen] = useState(false);
	const [activeInd, setActiveInd] = useState(-1);
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChange = date => {
		setSelectedDate(date);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Fragment>
			{formik.values.clRequired && (
				<div style={{ margin: '2rem auto' }}>
					<FlexDiv style={{ marginBottom: '5px' }}>
						<h3>CL Days</h3>
						{days.length < formik.values.clRequired && (
							<Button
								size='small'
								variant='contained'
								color='secondary'
								onClick={() => {
									setActiveInd(-1);
									setSelectedDate(
										days.length === 0 ? new Date() : addDays(new Date(days[days.length - 1]), 1)
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
								{days.map((val, ind) => {
									return (
										<TableRow>
											<TableCell component='th' scope='row'>
												{ind + 1}
											</TableCell>
											<TableCell
												style={{ cursor: 'pointer' }}
												onClick={() => {
													setActiveInd(ind);
													setSelectedDate(new Date(days[ind]));
													setOpen(true);
												}}
											>
												{format(new Date(val), 'dd - MM -yyyy')}
											</TableCell>
											<TableCell>
												<IconButton onClick={() => setDays(old => old.filter((v, i) => i !== ind))}>
													<DeleteIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			)}
			<Dialog
				onClose={() => {
					setDays(old => {
						if (activeInd === -1) return [...new Set([...old, selectedDate.toDateString()])];
						old[activeInd] = selectedDate.toDateString();
						return [...new Set(old)];
					});
					handleClose();
				}}
				aria-labelledby='simple-dialog-title'
				open={open}
			>
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
				</div>
			</Dialog>
		</Fragment>
	);
}
