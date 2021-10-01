import React from 'react';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import {
	Paper,
	TableRow,
	TableHead,
	TableContainer,
	TableCell,
	TableBody,
	Table,
	Button
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';

import TextField from '../../component/TextField';
import { FlexDiv } from './styles';

export default function AlternateArrangement() {
	return (
		<div style={{ margin: '2rem auto' }}>
			<FlexDiv style={{ marginBottom: '5px' }}>
				<h3>Alternate Arrangement</h3>
				<Button size='small' variant='contained' color='secondary'>
					Add
				</Button>
			</FlexDiv>
			<TableContainer component={Paper}>
				<Table>
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
									<KeyboardTimePicker margin='normal' />
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
	);
}
