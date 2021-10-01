import styled from 'styled-components';

export const Container = styled.div`
	width: 80%;
	padding: 1em;
	margin: 2em;
	border-radius: 5px;
	box-shadow: ${p => p.theme.boxShadow};
	background-color: ${p => p.theme.white};
`;

export const FormContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	grid-column-gap: 1em;

	@media (max-width: 500px) {
		grid-template-columns: 1fr;
	}
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

export const FlexDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
