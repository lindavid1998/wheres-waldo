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
	position: relative;
`;

const getImgDimensions = (imageDiv) => {
	return { height: imageDiv.clientHeight, width: imageDiv.clientWidth };
};

const convertTargetBoundaryToPixels = (imgDimensions, target) => {
	const { width, height } = imgDimensions;
	const boundary = target.boundary;

	return {
		north: {
			x: boundary.north.x * width,
			y: boundary.north.y * height,
		},
		south: {
			x: boundary.south.x * width,
			y: boundary.south.y * height,
		},
	};
};

const isInputWithinBoundary = (targetPos, inputPos) => {
	const x = inputPos.x;
	const y = inputPos.y;
	const isInputWithinX = x < targetPos.south.x && x > targetPos.north.x;
	const isInputWithinY = y < targetPos.south.y && y > targetPos.north.y;
	return isInputWithinX && isInputWithinY;
};

const Game = () => {
	const isAnsBoxVisible = useSelector((state) => state.isAnsBoxVisible);
	const targets = useSelector((state) => state.targets);
	const parentRef = useRef();
	const imageRef = useRef();
	const dispatch = useDispatch();

	const [ansBoxPosition, setAnsBoxPosition] = useState({});

	const checkAns = (targetId) => {
		// get image dimensions
		const imgDimensions = getImgDimensions(imageRef.current);
		console.log('img dimensions', imgDimensions);

		// look up target
		const target = targets.find((target) => target.id === targetId);

		// convert target position to pixels
		const targetPos = convertTargetBoundaryToPixels(imgDimensions, target);
		console.log('target', targetPos);

		console.log('input', ansBoxPosition)

		// check inputPos against targetPos
		if (isInputWithinBoundary(targetPos, ansBoxPosition)) {
			console.log('correct');
		} else {
			console.log('incorrect')
		}

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
				ref={imageRef}
				src={backgroundImage}
				data-testid='game-image'
				className='game-image'
				onClick={(e) => {
					const offset = e.target.getBoundingClientRect();
					const x = e.clientX - offset.x;
					const y = e.clientY - offset.y;
					console.log('answer box position', {x, y})
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
