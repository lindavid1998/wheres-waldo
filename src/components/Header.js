import React from 'react';
import styled from 'styled-components';
import Progress from './Progress';

const HeaderText = styled.h1`
	font-size: 1.4rem;
	margin: 0 0 10px 0;
  padding: 0;
`;

const Header = () => {
  return (
		<div className='Header'>
      <HeaderText>Where's Waldo?</HeaderText>
      <Progress></Progress>
		</div>
	);
}

export default Header;
