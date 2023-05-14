import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  font-size: 1.5rem;
  padding: 2rem;
  transition: 0.5s opacity ease-in-out;
  color: ${(props) => (props.isPositive ? 'var(--success-color)' : 'red')};
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
`;

const Feedback = () => {
  const message = useSelector((state) => state.feedbackMsg);
  const isPositive = message === 'Nice job!';
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <Message isPositive={isPositive} isVisible={isVisible}>
      {message}
    </Message>
  );
};

export default Feedback;
