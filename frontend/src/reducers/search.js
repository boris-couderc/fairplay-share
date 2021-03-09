import { SAVE_SEARCHED_ACTIVITIES } from 'src/actions/search';

const initialState = {
  activities: [],
};

const search = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_SEARCHED_ACTIVITIES:
      return {
        ...state,
        activities: [...action.activities],
      };
    default:
      return state;
  }
};

export default search;