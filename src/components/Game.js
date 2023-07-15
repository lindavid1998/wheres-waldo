import React from 'react';
import styled from 'styled-components/macro';
import backgroundImage from '../images/star_wars_illustration.jpeg';
import correctAnswer from '../sounds/correctAnswer.wav';
import wrongAnswer from '../sounds/wrongAnswer.mp3';
import AnswerBox from './AnswerBox';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	hideAnswerBox,
	showAnswerBox,
	markAsFound,
	setFeedback,
	incrementNumOfAttempts,
} from '../redux/actions';
import {
	getImgDimensions,
	convertTargetBoundaryToPixels,
	isInputWithinBoundary,
} from '../utils/helpers';



const Img = styled.img`
	width: 100%;
	height: auto;
`;

const Main = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;

const Game = () => {
	const isAnsBoxVisible = useSelector((state) => state.isAnsBoxVisible);
	const targets = useSelector((state) => state.targets);
	const parentRef = useRef();
	const imageRef = useRef();
	const dispatch = useDispatch();

	const [ansBoxPosition, setAnsBoxPosition] = useState({});

	const checkAns = (targetId) => {
		const imgDimensions = getImgDimensions(imageRef.current);
		const target = targets.find((target) => target.id === targetId);
		const targetPos = convertTargetBoundaryToPixels(imgDimensions, target);

		dispatch(incrementNumOfAttempts());
		
		if (isInputWithinBoundary(targetPos, ansBoxPosition)) {
			new Audio(correctAnswer).play();
			dispatch(markAsFound(targetId));
			dispatch(setFeedback('Nice job!'));
		} else {
			new Audio(wrongAnswer).play();
			dispatch(setFeedback('Wrong, try again'));
		}
		dispatch(hideAnswerBox());
	};

	useEffect(() => {
		const toggleAnsBoxVisibility = (e) => {
			const isInsideParentRef = parentRef.current.contains(e.target);
			if (isInsideParentRef && !isAnsBoxVisible) {
				dispatch(showAnswerBox());
			} else if (!isInsideParentRef && isAnsBoxVisible) {
				dispatch(hideAnswerBox());
			}
		};

		document.addEventListener('click', toggleAnsBoxVisibility);

		document.addEventListener('keydown', (e) => {
			if (isAnsBoxVisible && e.key === 'Escape') {
				dispatch(hideAnswerBox());
			}
		});

		return () => {
			document.removeEventListener('click', toggleAnsBoxVisibility);
		};
	});

	return (
		<Main ref={parentRef}>
			<Img
				ref={imageRef}
				src={backgroundImage}
				data-testid='game-image'
				className='game-image'
				onClick={(e) => {
					const offset = e.target.getBoundingClientRect();
					const x = e.clientX - offset.x;
					const y = e.clientY - offset.y;
					setAnsBoxPosition({ x, y });
				}}
			/>
			{isAnsBoxVisible && (
				<AnswerBox position={ansBoxPosition} checkAns={checkAns} />
			)}
		</Main>
	);
};

export default Game;
