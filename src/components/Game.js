import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../images/star_wars_illustration.jpeg';

const Img = styled.img`
  width: 100%;
  height: auto;
`

const Game = () => {
  return (
    <div>
      <Img src={backgroundImage}></Img>
		</div>
	);
};

export default Game;
