import React from 'react';
import styled from 'styled-components/macro';

const Message = styled.div`
	padding: 1rem 3rem;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	border-radius: 3px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 200px;
	background-color: var(--bg-color-lighter);
	gap: 10px;
  position: absolute;
  top: 50px;
`;

const MainText = styled.div`
	font-size: 1.3rem;
	font-weight: bold;
`;

const Success = styled(MainText)`
	color: var(--success-color);
`;

const Failure = styled(MainText)`
	color: red;
`;

const Details = styled.div`
	font-size: 0.8rem;
	color: var(--text-color-darker);
`;

const Feedback = () => {
	return (
		<Message>
			<Success>Nice job!</Success>
			<Details>You found (name)</Details>
		</Message>
	);
};

export default Feedback;
