import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';

const Input = styled.input`
	display: none;
`;

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

const StyledForm = styled.form`
	border: 1px solid var(--text-color-darker);
	position: absolute;
	top: ${(props) => props.yPos}px;
	left: ${(props) => props.xPos}px;
`;

const FormRow = ({ name }) => {
	return (
		<Row>
			<Input type='radio' id={name} name={name} value={name} />
			<label htmlFor={name}>{name}</label>
		</Row>
	);
};

const AnswerBox = ({ xPos, yPos }) => {
	const targets = useSelector((state) => state.targets);
	return (
		<div>
			<StyledForm xPos={xPos} yPos={yPos}>
				{targets.map((target) => (
					<FormRow key={target.id} name={target.name}></FormRow>
				))}
			</StyledForm>
		</div>
	);
};

export default AnswerBox;
