import React from 'react';

import TextField from '../../component/TextField';
import PersonIcon from '@material-ui/icons/Person';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import TodayIcon from '@material-ui/icons/Today';

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
						<TextField Icon={<PersonIcon />} label='first' />
						<TextField Icon={<TodayIcon />} label='second' />
						<TextField Icon={<BusinessCenterIcon />} label='third' />
					</div>
					<div>
						<TextField Icon={<PersonIcon />} label='first' />
						<TextField Icon={<TodayIcon />} label='second' />
						<TextField Icon={<BusinessCenterIcon />} label='third' />
					</div>
				</FormContainer>
			</Container>
		</Main>
	);
}
