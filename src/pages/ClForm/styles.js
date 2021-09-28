import styled from 'styled-components';

export const Container = styled.div`
	width: 75%;
	height: 20rem;
	box-shadow: ${p => p.theme.boxShadow};
	background-color: ${p => p.theme.white};
`;

export const Main = styled.div`
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
