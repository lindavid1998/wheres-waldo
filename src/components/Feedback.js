import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Message = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 200px;
	font-size: 1.5rem;
	padding: 0.5rem;
	transition: 0.5s opacity ease-in-out;
	color: ${(props) => (props.isPositive ? 'var(--success-color)' : 'red')};
	opacity: ${(props) => (props.isVisible ? '1' : '0')};
`;

const Main = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 10px;
`;

const Buttons = styled.div`
	display: ${(props) => (props.isGameComplete ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	gap: 13px;
`;

const Button = styled.button`
	background: ${(props) => (props.$primary ? 'white' : 'black')};
	color: ${(props) => (props.$primary ? 'black' : 'white')};
	font-size: 1em;
	padding: 0.4em 1em;
	border: 2px solid white;
	transition: all 0.5s ease;
	animation: ${fadeInAnimation} 1.5s forwards;
	&:hover {
		transform: translateY(-5px);
		cursor: pointer;
	}
`;

const Feedback = (props) => {
	const { submitTime } = props;
	const message = useSelector((state) => state.feedbackMsg);
	const numOfAttempts = useSelector((state) => state.numOfAttempts);
	const targets = useSelector((state) => state.targets);
	const isGameComplete = targets.every((target) => target.isFound);

	const isPositive = isGameComplete || message?.includes('Nice job!') || false;

	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		setIsVisible(true);
		let timer;
		if (!isGameComplete) {
			timer = setTimeout(() => {
				setIsVisible(false);
			}, 2000);
		}
		return () => clearTimeout(timer);
	}, [isGameComplete, numOfAttempts]);

	return (
		<Main>
			<Message isPositive={isPositive} isVisible={isVisible}>
				{message}
			</Message>
			<Buttons isGameComplete={isGameComplete}>
				<Button $primary onClick={submitTime}>
					Submit time
				</Button>
				<Link
					style={{ textDecoration: 'none' }}
					to={'/wheres-waldo/leaderboard'}
				>
					<Button>Leaderboard</Button>
				</Link>
			</Buttons>
		</Main>
	);
};

export default Feedback;
