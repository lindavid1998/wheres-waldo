import React from 'react';
import styled from 'styled-components/macro';
import Progress from './Progress';

const HeaderText = styled.h1`
	font-size: 1.4rem;
  padding: 0 0 10px 0;
`;

const Container = styled.div`
	position: -webkit-sticky; 
	position: sticky;
	top: 0;
	background-color: var(--bg-color)
`;

const Header = () => {
  return (
		<Container>
      <HeaderText>Where's Waldo?</HeaderText>
      <Progress></Progress>
		</Container>
	);
}

export default Header;
