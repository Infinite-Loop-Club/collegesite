import React, { Fragment, useState } from 'react';
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

import { FlexDiv } from './styles';
import ScheduleModal from './ScheduleModal';

export default function AlternateArrangement() {
	const [open, setOpen] = useState(false);

	return (
		<Fragment>
			<div style={{ margin: '2rem auto' }}>
				<FlexDiv style={{ marginBottom: '5px' }}>
					<h3>Alternate Arrangement</h3>
					<Button size='small' variant='contained' color='secondary' onClick={() => setOpen(true)}>
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
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			<ScheduleModal {...{ open, setOpen }} />
		</Fragment>
	);
}
