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
  width: 100%;
`;

const Subcontainer = styled.div`
  max-width: 1600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 30px;
`;

const Header = () => {
  return (
    <Container>
      <Subcontainer>
        <Progress></Progress>
        <Stopwatch></Stopwatch>
      </Subcontainer>
    </Container>
  );
};

export default Header;
