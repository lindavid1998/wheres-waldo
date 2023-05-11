import React from 'react';
import styled from 'styled-components/macro';
import backgroundImage from '../images/star_wars_illustration.jpeg';
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
`;

const Game = () => {
	const isAnsBoxVisible = useSelector((state) => state.isAnsBoxVisible);
	const parentRef = useRef();
	const dispatch = useDispatch();

	const [ansBoxPosition, setAnsBoxPosition] = useState({});

	const checkAns = (targetId) => {
		// hide answer box
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
				src={backgroundImage}
				data-testid='game-image'
				className='game-image'
				onClick={(e) => {
					const x = e.clientX;
					const y = e.clientY;
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
