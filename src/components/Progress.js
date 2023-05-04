import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const UnorderedList = styled.ul`
	list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 50px;
  justify-content: space-around;
  margin: 40px 0;
`;

const Progress = () => {
  const targets = useSelector((state) => state.targets);

  return (
		<UnorderedList>
			{targets.map((target) => (
				<li key={target.id}>{target.name}</li>
			))}
		</UnorderedList>
	);
}

export default Progress