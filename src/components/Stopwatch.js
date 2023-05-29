import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { setFeedback } from '../redux/actions';

const StyledDiv = styled.div`
	font-size: 2.5rem;
	font-weight: bold;
	width: 160px;
`;

const convertSecondsToHMS = (timeInSeconds) => {
	let hours = Math.floor(timeInSeconds / 3600);
	let minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
	let seconds = timeInSeconds - hours * 3600 - minutes * 60;
	let timeArray = [hours.toString(), minutes.toString(), seconds.toString()];

	timeArray = timeArray.map((time) => {
		if (time.length === 1) {
			return '0' + time;
		} else {
			return time;
		}
	});

	return timeArray.join(':');
};

const Stopwatch = () => {
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

	const displayedTime = convertSecondsToHMS(secondsElapsed);

	return <StyledDiv data-testid='stopwatch'>{displayedTime}</StyledDiv>;
};

export default Stopwatch;
