import React from 'react';
import { createGlobalStyle, ThemeProvider as ScThemeProvide } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import ClForm from './pages/ClForm';
import theme from './theme';
import { colors, styles } from './constants';

export default function App() {
	return (
		<ScThemeProvide theme={{ ...colors, ...styles }}>
			<GlobalStyles />
			<MuiThemeProvider theme={theme}>
				<ClForm />
			</MuiThemeProvider>
		</ScThemeProvide>
	);
}

const GlobalStyles = createGlobalStyle`
  *, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }

  ::-webkit-scrollbar {
    width: .5rem;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;
