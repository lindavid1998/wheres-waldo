import React from 'react';
import styled from 'styled-components/macro';

const Main = styled.div`
	display: flex;
	justify-content: space-between;
	border-top: 1px solid var(--text-color-darker);
	border-bottom: 1px solid var(--text-color-darker);
	padding: 8px;
`;

const TimeEntry = (props) => {
	let { time, user } = props;

	if (user.length === 0) {
		user = 'Foobar';
	}

	return (
		<Main>
			<div>{user}</div>
			<div>{time}</div>
		</Main>
	);
};

export default TimeEntry;
