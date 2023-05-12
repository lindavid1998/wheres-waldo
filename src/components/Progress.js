import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

const UnorderedList = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
	display: flex;
	gap: 30px;
	margin: 20px 0;
`;

const StyledIcon = styled.li`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 10px;
`;

const ImgContainer = styled.div`
	width: 80px;
	height: 80px;
	transition: 0.2s all ease-in-out;
  border-radius: 50%;
	background: ${(props) =>
		props.isFound ? 'black' : null};
`;

const Img = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	object-fit: cover;
	opacity: ${(props) => (props.isFound ? '0.4' : null)};
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
	color: ${(props) =>
		props.isFound ? 'var(--success-color)' : 'var(--text-color)'};
`;

const Icon = (props) => {
	const { name, imgSrc, isFound } = props;
	return (
		<StyledIcon>
      <ImgContainer isFound={isFound}>
				<Img src={imgSrc} alt={name} isFound={isFound} />
			</ImgContainer>
			<Name isFound={isFound}>{name}</Name>
		</StyledIcon>
	);
};

const Progress = () => {
	const targets = useSelector((state) => state.targets);

	return (
		<UnorderedList>
			{targets.map((target) => (
				<Icon
					key={target.id}
					name={target.name}
					imgSrc={target.imgSrc}
					isFound={target.isFound}
				></Icon>
			))}
		</UnorderedList>
	);
};

export default Progress;
