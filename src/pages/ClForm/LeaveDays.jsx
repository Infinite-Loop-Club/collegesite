import React from 'react';
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

import DeleteIcon from '@material-ui/icons/Delete';
import { FlexDiv } from './styles';

export default function LeaveDays() {
	return (
		<div style={{ margin: '2rem auto' }}>
			<FlexDiv style={{ marginBottom: '5px' }}>
				<h3>CL Days</h3>
				<Button size='small' variant='contained' color='secondary'>
					Add
				</Button>
			</FlexDiv>
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell component='th' scope='row'>
								1
							</TableCell>
							<TableCell>12 - 09 -2013</TableCell>
							<TableCell>
								<IconButton>
									<DeleteIcon />
								</IconButton>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component='th' scope='row'>
								1
							</TableCell>
							<TableCell>13 - 09 -2013</TableCell>
							<TableCell>
								<IconButton>
									<DeleteIcon />
								</IconButton>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component='th' scope='row'>
								1
							</TableCell>
							<TableCell>14 - 09 -2013</TableCell>
							<TableCell>
								<IconButton>
									<DeleteIcon />
								</IconButton>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
