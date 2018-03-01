import Firebase from 'firebase';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  SET_ERROR
} from './types';
import { aggiornAlert } from './MapActions';

export const loginRequest = (dispatch, email, password, navigation) => {
  dispatch({ type: LOGIN_REQUEST, isLoading: true });
  Firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      loginSuccess(dispatch);
      aggiornAlert(dispatch, 'Benvenuto!');
      const newAlert = false;
      navigation.navigate('mappa', { newAlert });
    })
    .catch((error) => {
        console.log(error);
        loginFailed(dispatch, error);
    });
};

const loginSuccess = (dispatch) => {
  const action = {
    type: LOGIN_SUCCESS,
    isLoading: false,
    error: ''
  };
  return dispatch(action);
};

const loginFailed = (dispatch, error) => {
  const action = {
    type: LOGIN_FAILED,
    error,
    isLoading: false
  };
  return dispatch(action);
};

export const registrationRequest = (dispatch, email, password, navigation) => {
  dispatch({ type: REGISTRATION_REQUEST, isLoading: true });
  Firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      registrationSuccess(dispatch);
      navigation.navigate('login');
    })
    .catch((error) => {
        console.log(error);
        registrationFailed(dispatch, error);
    });
};

const registrationSuccess = (dispatch) => {
  const action = {
    type: REGISTRATION_SUCCESS,
    isLoading: false,
    error: ''
  };
  return dispatch(action);
};

const registrationFailed = (dispatch, error) => {
  const action = {
    type: REGISTRATION_FAILED,
    error,
    isLoading: false
  };
  return dispatch(action);
};

export const setError = (dispatch, error) => {
  dispatch({ type: SET_ERROR, error });
};
