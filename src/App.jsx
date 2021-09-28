import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import ClForm from './pages/ClForm';

export default function App() {
	return (
		<Main className='App'>
			<GlobalStyles />
			<ClForm />
		</Main>
	);
}

const GlobalStyles = createGlobalStyle`
  *, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: .5rem;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const Main = styled.div`
	margin: 0;
	padding: 0;
	min-height: 100vh;
	background-image: linear-gradient(rgba(242, 242, 242, 0.8), rgba(242, 242, 242, 0.8)),
		url(/images/hero.jpg);
	background-position: center center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;
