import React from 'react';
import { TextField } from '@material-ui/core';

import WithIcon from './WithIcon';

export default function TextFieldMod({ Icon, ...props }) {
	return (
		<WithIcon Icon={Icon}>
			<TextField fullWidth {...props} />
		</WithIcon>
	);
}
