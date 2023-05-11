import { configureStore } from '@reduxjs/toolkit';
import R2D2 from './images/R2D2.png';
import Finn from './images/finn.png';
import HanSolo from './images/han_solo.png';

const targetOne = {
	id: 0,
	name: 'R2D2',
	imgSrc: R2D2,
	isFound: false,
	boundary: {
		north: { x: 0.062, y: 0.360 },
		south: { x: 0.089, y: 0.379 },
	},
};

const targetTwo = {
	id: 1,
	name: 'Finn',
	imgSrc: Finn,
	isFound: false,
	boundary: {
		north: { x: 0.53, y: 0.38 },
		south: { x: 0.56, y: 0.41 },
	},
};

const targetThree = {
	id: 2,
	name: 'Han Solo',
	imgSrc: HanSolo,
	isFound: false,
	boundary: {
		north: { x: 0.77, y: 0.29 },
		south: { x: 0.80, y: 0.32 },
	},
};

const initialState = {
	targets: [targetOne, targetTwo, targetThree],
	isGameComplete: false,
	isAnsBoxVisible: false,
};

const SUBMIT_ANSWER = 'SUBMIT_ANSWER';
const SHOW_ANSWER_BOX = 'SHOW_ANSWER_BOX';
const HIDE_ANSWER_BOX = 'HIDE_ANSWER_BOX';

const submitAnswer = (id) => {
	return {
		type: SUBMIT_ANSWER,
		info: id,
	};
};

const showAnswerBox = () => {
	return {
		type: SHOW_ANSWER_BOX,
	};
};

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
};

const store = configureStore({
	reducer: reducer,
});

export { store, submitAnswer, showAnswerBox, hideAnswerBox };
