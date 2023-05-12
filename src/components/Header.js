import React from 'react';
import styled from 'styled-components/macro';
import Progress from './Progress';
import Stopwatch from './Stopwatch';

const Container = styled.div`
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	background-color: var(--bg-color);
	z-index: 50;
	padding: 0 20px;
`;

const Header = () => {
  return (
		<Container>
			<Progress></Progress>
			<Stopwatch></Stopwatch>
		</Container>
	);
}

export default Header;
