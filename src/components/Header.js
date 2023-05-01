import React from 'react';
import styled from 'styled-components';

const HeaderText = styled.h1`
	font-size: 1.4rem;
	margin: 0;
	padding: 10px;
`;

function Header() {
	return (
		<div className='Header'>
			<HeaderText>Where's Waldo?</HeaderText>
		</div>
	);
}

export default Header;
