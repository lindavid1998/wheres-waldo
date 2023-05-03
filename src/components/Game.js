import React from 'react';
import styled from 'styled-components/macro';
import backgroundImage from '../images/star_wars_illustration.jpeg';
import Feedback from './Feedback';

const Img = styled.img`
  width: 100%;
  height: auto;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const Game = () => {
  return (
		<Main>
      <Feedback></Feedback>
			<Img src={backgroundImage}></Img>
		</Main>
	);
};

export default Game;
