import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  SET_ERROR
} from '../actions/types';

const initialState = {
  isLoading: false,
  error: ''
};

export default function authReducer(state = initialState, action) {
  //console.log('Sono nell\'authReducer', action);
  switch (action.type) {
    case LOGIN_REQUEST: case REGISTRATION_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case LOGIN_SUCCESS: case LOGIN_FAILED: case REGISTRATION_SUCCESS: case REGISTRATION_FAILED:
      return {
        ...state,
        isLoading: action.isLoading,
        error: action.error
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.error
      };

    default:
      //console.log('L\'AuthReducer non mi serve atm');
      return state;
  }
}
