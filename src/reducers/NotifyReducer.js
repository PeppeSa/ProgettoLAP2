import {
  TOKEN_TAKEN
} from '../actions/types';

const initialState = {
  token: ''
};

export default function NotifyReducer(state = initialState, action) {
  switch (action.type) {
    case TOKEN_TAKEN:
      return {
        ...state,
        token: action.token
      };

    default:
      return state;
  }
}
