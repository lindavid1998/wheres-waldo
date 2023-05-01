import { configureStore } from '@reduxjs/toolkit';

const targetOne = {
	id: 0,
	name: 'some name',
	imgSrc: '',
	isFound: false,
};

const targetTwo = {
	id: 1,
	name: 'some other name',
	imgSrc: '',
	isFound: false,
};

const targetThree = {
	id: 2,
	name: 'name 3',
	imgSrc: '',
	isFound: false,
};

const initialState = {
	targets: [targetOne, targetTwo, targetThree],
	isGameComplete: false,
};

const SUBMIT_ANSWER = 'SUBMIT_ANSWER'

const submitAnswer = (id) => {
  return {
		type: SUBMIT_ANSWER,
		info: id,
	};
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
		case SUBMIT_ANSWER:
			console.log('test');
			// add logic here for checking answer
			return {
				...state,
				isAnswered: true,
			};
		default:
			return state;
	}
}

const store = configureStore({
	reducer: reducer,
});

export { store, submitAnswer }