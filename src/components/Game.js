import React from 'react';
import styled from 'styled-components/macro';
import backgroundImage from '../images/star_wars_illustration.jpeg';
import Feedback from './Feedback';
import AnswerBox from './AnswerBox';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideAnswerBox, showAnswerBox } from '../store';

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
	const parentRef = useRef();
	const dispatch = useDispatch();

	const [answerBoxPosX, setAnswerBoxPosX] = useState(0);
	const [answerBoxPosY, setAnswerBoxPosY] = useState(0);

	const setAnsBoxPosition = (e) => {
		const offset = e.target.getBoundingClientRect();
		const xOffset = offset.x;
		const yOffset = offset.y;

		setAnswerBoxPosX(e.clientX - xOffset);
		setAnswerBoxPosY(e.clientY - yOffset);
	};

	useEffect(() => {
		const toggleAnsBoxVisibility = (e) => {
			parentRef.current.contains(e.target)
				? dispatch(showAnswerBox())
				: dispatch(hideAnswerBox());
		};

		document.addEventListener('click', toggleAnsBoxVisibility);
		document.addEventListener('keydown', (e) => {
			e.key === 'Escape' && dispatch(hideAnswerBox()) 
		});

		return () => {
			document.removeEventListener('click', toggleAnsBoxVisibility);
		};
	});

	return (
		<Main ref={parentRef}>
			{/* <Feedback></Feedback> */}
			<Img onClick={setAnsBoxPosition} src={backgroundImage} />
			{isAnsBoxVisible && (
				<AnswerBox xPos={answerBoxPosX} yPos={answerBoxPosY} />
			)}
		</Main>
	);
};

export default Game;
