import React from 'react';
import styled from 'styled-components';

export default function ClForm() {
	return (
		<Main>
			<Container>App</Container>
		</Main>
	);
}

const Container = styled.div`
	width: 75%;
	height: 20rem;
	box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
	background-color: white;
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
