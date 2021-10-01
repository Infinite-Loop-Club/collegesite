import React from 'react';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { TextField, Button, Box } from '@material-ui/core';

import Modal from '../../component/Modal';

export default function ScheduleModal({ open, setOpen }) {
	return (
		<Modal {...{ open, setOpen }} title='Add Arrangement'>
			<form>
				<TextField label='Hour' fullWidth />
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardTimePicker label='Timing' margin='normal' fullWidth />
				</MuiPickersUtilsProvider>
				<TextField label='Class' fullWidth />
				<TextField label='Subject' fullWidth />
				<TextField label='Faculty' fullWidth />
				<Box display='flex' justifyContent='flex-end' mt={2}>
					<Button
						variant='outlined'
						color='primary'
						onClick={() => setOpen(false)}
						style={{ marginRight: '10px' }}
					>
						Cancel
					</Button>
					<Button type='submit' variant='contained' color='primary'>
						Add
					</Button>
				</Box>
			</form>
		</Modal>
	);
}
