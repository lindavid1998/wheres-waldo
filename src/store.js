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
    north: { x: 0.062, y: 0.36 },
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
    south: { x: 0.8, y: 0.32 },
  },
};

const initialState = {
  targets: [targetOne, targetTwo, targetThree],
  isAnsBoxVisible: false,
  feedbackMsg: null,
  numOfAttempts: 0,
};

const MARK_AS_FOUND = 'MARK_AS_FOUND';
const SHOW_ANSWER_BOX = 'SHOW_ANSWER_BOX';
const HIDE_ANSWER_BOX = 'HIDE_ANSWER_BOX';
const SET_FEEDBACK = 'SET_FEEDBACK';
const INCREMENT_NUM_OF_ATTEMPTS = 'INCREMENT_NUM_OF_ATTEMPTS';

const incrementNumOfAttempts = () => {
  return {
		type: INCREMENT_NUM_OF_ATTEMPTS,
	};
}

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MARK_AS_FOUND:
      const updatedTargets = state.targets.map((target) => {
        if (target.id === action.payload) {
          return {
            ...target,
            isFound: true,
          };
        } else {
          return target;
        }
      });

      return {
        ...state,
        targets: updatedTargets,
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

    case SET_FEEDBACK:
      return {
        ...state,
        feedbackMsg: action.payload,
      };
    
    case INCREMENT_NUM_OF_ATTEMPTS:
      return {
				...state,
        numOfAttempts: state.numOfAttempts + 1,
			};

    default:
      return state;
  }
};

const store = configureStore({
  reducer: reducer,
});

export {
	store,
	markAsFound,
	showAnswerBox,
	hideAnswerBox,
	setFeedback,
	incrementNumOfAttempts,
};
