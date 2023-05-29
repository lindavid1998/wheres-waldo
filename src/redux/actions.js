import {
	MARK_AS_FOUND,
	SHOW_ANSWER_BOX,
	HIDE_ANSWER_BOX,
	SET_FEEDBACK,
	INCREMENT_NUM_OF_ATTEMPTS,
} from './constants';

const incrementNumOfAttempts = () => {
	return {
		type: INCREMENT_NUM_OF_ATTEMPTS,
	};
};

const setFeedback = (message) => {
	return {
		type: SET_FEEDBACK,
		payload: message,
	};
};

const markAsFound = (id) => {
	return {
		type: MARK_AS_FOUND,
		payload: id,
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

export {
	incrementNumOfAttempts,
	setFeedback,
	markAsFound,
	showAnswerBox,
	hideAnswerBox,
};
