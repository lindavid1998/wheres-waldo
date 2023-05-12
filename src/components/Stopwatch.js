import React from 'react';
import { useState, useEffect } from 'react';

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

	useEffect(() => {
		let intervalId;
		intervalId = setInterval(() => {
			setSecondsElapsed((prevSecondsElapsed) => prevSecondsElapsed + 1);
		}, 1000);

		return () => clearInterval(intervalId);
	});

	return <div>{convertSecondsToHMS(secondsElapsed)}</div>;
};

export default Stopwatch;
