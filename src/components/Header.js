import React from 'react';
import styled from 'styled-components/macro';
import Progress from './Progress';
import Feedback from './Feedback';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
	position: relative;
	flex-direction: column;

	@media (min-width: 768px) {
		flex-direction: row;
	}
`;

const Stopwatch = styled.div`
	font-size: 2.5rem;
	font-weight: bold;
`;

const PhotoCred = styled.div`
	padding: 0 30px;
	position: relative;
	bottom: 16px;
`;

const Instructions = styled.h2`
	padding: 30px;
	font-weight: normal;
	margin: 0
`

const Header = () => {
	const [secondsElapsed, setSecondsElapsed] = useState(0);
	const targets = useSelector((state) => state.targets);
	const isGameComplete = targets.every((target) => target.isFound);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const incrementSeconds = () => {
			setSecondsElapsed((prevSecondsElapsed) => prevSecondsElapsed + 1);
		};

		let intervalId = setInterval(incrementSeconds, 1000);

		if (isGameComplete) {
			dispatch(setFeedback('Game complete'));
			clearInterval(intervalId);
		}

		return () => clearInterval(intervalId);
	}, [isGameComplete]);

	useEffect(() => {
		return () => dispatch({ type: 'RESET_STATE' });
	}, []);

	const timeInSeconds = convertSecondsToHMS(secondsElapsed);

	const submitTime = async () => {
		try {
			let user = prompt('Please enter your name');
			const docRef = await addDoc(collection(db, 'leaderboard'), {
				user: user,
				displayedTime: timeInSeconds,
				time: secondsElapsed,
			});
			console.log('Document written with ID: ', docRef.id);
			navigate('/wheres-waldo/leaderboard');
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};

	return (
		<Container>
			<Instructions>
				<strong>Instructions: </strong>Find all targets below on the image. When
				found, click on their position in the image and select the appropriate
				label.
			</Instructions>

			<PhotoCred>Illustration credit: Gus Morais OC</PhotoCred>

			<Subcontainer>
				<Progress />
				<Feedback submitTime={submitTime} />
				<Stopwatch data-testid='stopwatch'>{timeInSeconds}</Stopwatch>
			</Subcontainer>
		</Container>
	);
};

export default Header;
