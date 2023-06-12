import React from 'react';
import styled from 'styled-components/macro';
import Progress from './Progress';
import Feedback from './Feedback';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFeedback } from '../redux/actions';
import { convertSecondsToHMS } from '../utils/helpers';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

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

const Stopwatch = styled.div`
	font-size: 2.5rem;
	font-weight: bold;
	width: 160px;
`;

const Header = () => {
	const [secondsElapsed, setSecondsElapsed] = useState(0);
	const targets = useSelector((state) => state.targets);
	const isGameComplete = targets.every((target) => target.isFound);
	const dispatch = useDispatch();

	useEffect(() => {
		let intervalId;
		if (isGameComplete) {
			dispatch(setFeedback('Game complete'));
		} else {
			intervalId = setInterval(() => {
				setSecondsElapsed((prevSecondsElapsed) => prevSecondsElapsed + 1);
			}, 1000);
		}
		return () => clearInterval(intervalId);
	}, [isGameComplete]);

	const timeInSeconds = convertSecondsToHMS(secondsElapsed);

	const submitTime = async () => {
		try {
			const docRef = await addDoc(collection(db, 'leaderboard'), {
				time: timeInSeconds,
			});
			console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
  };
  
	return (
		<Container>
			<Subcontainer>
				<Progress />
				<Feedback submitTime={submitTime} />
				<Stopwatch data-testid='stopwatch'>{timeInSeconds}</Stopwatch>
			</Subcontainer>
		</Container>
	);
};

export default Header;
