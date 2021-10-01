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
import { format } from 'date-fns';

import { FlexDiv } from './styles';
import ScheduleModal from './ScheduleModal';

export default function AlternateArrangement({ arrangement, setArrangement }) {
	const [open, setOpen] = useState(false);
	const [activeInd, setActiveInd] = useState(-1);

	return (
		<Fragment>
			<div style={{ margin: '2rem auto' }}>
				<FlexDiv style={{ marginBottom: '5px' }}>
					<h3>Alternate Arrangement</h3>
					<Button
						size='small'
						variant='contained'
						color='secondary'
						onClick={() => {
							setActiveInd(-1);
							setOpen(true);
						}}
					>
						Add
					</Button>
				</FlexDiv>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Hour</TableCell>
								<TableCell>Time</TableCell>
								<TableCell>Year</TableCell>
								<TableCell>Class</TableCell>
								<TableCell>Subject</TableCell>
								<TableCell>Faculty</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{arrangement.map((arr, ind) => {
								return (
									<TableRow
										key={ind}
										style={{ cursor: 'pointer' }}
										onClick={() => {
											setActiveInd(ind);
											setOpen(true);
										}}
									>
										<TableCell style={{ whiteSpace: 'nowrap' }}>{arr.hour}</TableCell>
										<TableCell style={{ whiteSpace: 'nowrap' }}>
											{format(new Date(arr.timing), 'hh:mm bbb')}
										</TableCell>
										<TableCell style={{ whiteSpace: 'nowrap' }}>{arr.year}</TableCell>
										<TableCell style={{ whiteSpace: 'nowrap' }}>{arr.class}</TableCell>
										<TableCell style={{ whiteSpace: 'nowrap' }}>{arr.subject}</TableCell>
										<TableCell style={{ whiteSpace: 'nowrap' }}>{arr.faculty}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					{arrangement.length === 0 && (
						<h5 style={{ margin: '10px', textAlign: 'center' }}>NOT ADDED</h5>
					)}
				</TableContainer>
			</div>
			<ScheduleModal {...{ open, setOpen, arrangement, setArrangement, activeInd, setActiveInd }} />
		</Fragment>
	);
}
