import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

import colors from './constants/colors';

const theme = responsiveFontSizes(
	createTheme({
		palette: {
			primary: {
				main: colors.primary
			},
			secondary: {
				main: colors.secondary
			},
			warning: {
				main: colors.tomato
			}
		},
		typography: {
			fontFamily: ['Poppins', 'sans-serif'].join(',')
		}
	})
);

export default theme;
