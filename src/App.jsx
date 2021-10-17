import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider as ScThemeProvide } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import { Login, ClForm } from 'pages';
import theme from './theme';
import { colors, styles } from './constants';

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		return localStorage.getItem('aubit_token') ? true : false;
	});

	return (
		<ScThemeProvide theme={{ ...colors, ...styles }}>
			<GlobalStyles />
			<MuiThemeProvider theme={theme}>
				{isLoggedIn ? <ClForm /> : <Login {...{ setIsLoggedIn }} />}
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
