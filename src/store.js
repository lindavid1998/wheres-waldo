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
	isAnsBoxVisible: false,
};

const SUBMIT_ANSWER = 'SUBMIT_ANSWER'
const SHOW_ANSWER_BOX = 'SHOW_ANSWER_BOX'
const HIDE_ANSWER_BOX = 'HIDE_ANSWER_BOX'

const submitAnswer = (id) => {
  return {
		type: SUBMIT_ANSWER,
		info: id,
	};
}

const showAnswerBox = () => {
	return {
		type: SHOW_ANSWER_BOX
	}
}

const hideAnswerBox = () => {
	return {
		type: HIDE_ANSWER_BOX,
	};
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
		case SUBMIT_ANSWER:
			// console.log('test');
			// add logic here for checking answer
			return {
				...state,
				isAnswered: true,
			};
		case SHOW_ANSWER_BOX:
			return {
				...state,
				isAnsBoxVisible: true,
			};
		case HIDE_ANSWER_BOX:
			return {
				...state,
				isAnsBoxVisible: false,
			};
		default:
			return state;
	}
}

const store = configureStore({
	reducer: reducer,
});

export { store, submitAnswer, showAnswerBox, hideAnswerBox }