import React, { useEffect, useState } from 'react';
import { createGlobalStyle, ThemeProvider as ScThemeProvide } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';

import { Login, ClForm } from 'pages';
import { Loader, BgContainer } from 'components';
import theme from './theme';
import { colors, styles } from './constants';

export default function App() {
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const checkAuth = async () => {
		try {
			await axios.get('/api/auth', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('aubit_token')}`
				}
			});
			setIsLoggedIn(true);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<ScThemeProvide theme={{ ...colors, ...styles }}>
			<GlobalStyles />

			<MuiThemeProvider theme={theme}>
				{loading ? (
					<BgContainer>
						<Loader />
					</BgContainer>
				) : isLoggedIn ? (
					<ClForm />
				) : (
					<Login {...{ setIsLoggedIn }} />
				)}
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
