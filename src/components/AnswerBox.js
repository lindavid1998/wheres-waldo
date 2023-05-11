import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';

const Row = styled.div`
	padding: 8px;
	transition: 0.2s all ease-in-out;
	border-top: 1px solid var(--text-color-darker);
	background-color: var(--bg-color);
	white-space: nowrap;
	&:hover {
		cursor: pointer;
		color: var(--accent-color);
	}
	&:first-child {
		border-top: none;
	}
`;

const StyledDiv = styled.div`
	border: 1px solid var(--text-color-darker);
	position: absolute;
	top: ${(props) => props.yPos}px;
	left: ${(props) => props.xPos}px;
`;

const AnswerBox = ({ position, checkAns }) => {
	const targets = useSelector((state) => state.targets);
	return (
		<div data-testid='AnswerBox'>
			<StyledDiv xPos={position.x} yPos={position.y}>
				{targets.map((target) => (
					<Row key={target.id} onClick={() => checkAns(target.id)}>
						{target.name}
					</Row>
				))}
			</StyledDiv>
		</div>
	);
};

export default AnswerBox;
