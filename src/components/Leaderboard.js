import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import TimeEntry from './TimeEntry';
import { Link } from 'react-router-dom';

const db = getFirestore();
const colRef = collection(db, 'leaderboard');

const Main = styled.div`
  max-width: 850px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 13px;
`;

const Button = styled.button`
  background: black;
  color: white;
	font-size: 1em;
	padding: 0.5rem;
	border: 2px solid white;
	transition: all 0.5s ease;
	&:hover {
		transform: translateY(-5px);
		cursor: pointer;
	}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Leaderboard = () => {
	const [entries, setEntries] = useState([]);

	useEffect(() => {
    const fetchEntries = async () => {
      const fetchedEntries = [];
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach(doc => {
        fetchedEntries.push(doc.data())
      })

      fetchedEntries.sort((a, b) => (a.time - b.time))
			setEntries(fetchedEntries);
		};

		fetchEntries();
	}, []);

	return (
		<Main>
			<Header>
				<h1>Leaderboard</h1>
				<Link
					style={{ textDecoration: 'none' }}
					to={'/wheres-waldo/'}
				>
					<Button>Back to game</Button>
				</Link>
			</Header>

			{entries.map((entry, index) => {
				return (
					<TimeEntry key={index} user={entry.user} time={entry.displayedTime} />
				);
			})}
		</Main>
	);
};

export default Leaderboard;
