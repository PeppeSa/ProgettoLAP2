import { Permissions, Location } from 'expo';
import Firebase from 'firebase';
import {
  RICHIESTA_PERMESSI,
  PERMESSO_NEGATO,
  RECUPERA_NEGOZI,
  CAMBIA_REGIONE_MAPPA,
  NUOVO_NEGOZIO_CARICATO,
  NEGOZIO_MODIFICATO,
  NEGOZIO_ELIMINATO,
  AGGIORNA_ALERT
} from './types';
import { PATH_NEGOZI } from './final';

export const richiestaPermessi = async (dispatch) => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  const action = {
    type: RICHIESTA_PERMESSI,
    permessi: status === 'granted',
    isLoading: false
  };
  return dispatch(action);
};

export const permessoNegato = (dispatch) => {
  const action = {
    type: PERMESSO_NEGATO,
    alert: 'Devi dare il consenso al recupero della tua posizione GPS per utilizzare l\'App!'
  };
  return dispatch(action);
};

export const aggiornaPosizione = async (dispatch, region) => {
  const location = await Location.getCurrentPositionAsync({});
  const action = {
    type: CAMBIA_REGIONE_MAPPA,
    region: {
      ...region,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
  };
  return dispatch(action);
};

export const recuperaNegozi = async (dispatch) => {
  await Firebase.database().ref(PATH_NEGOZI)
    .on('value', snapshot => dispatch({ type: RECUPERA_NEGOZI, payload: snapshot.val() }));
};

export const vaiAlNegozio = (dispatch, coords, region, navigation) => {
  const action = {
    type: CAMBIA_REGIONE_MAPPA,
    region: {
      ...region,
      latitude: coords.latitude,
      longitude: coords.longitude
    }
  };
  const newAlert = false;
  navigation.navigate('mappa', { newAlert });
  return dispatch(action);
};

export const creaNegozio =
  (dispatch, coords, descrizione, image, nome, tipologia, pinColor, navigation) => {
    const newStore = {
      coords,
      descrizione,
      image,
      nome,
      tipologia,
      followers: 'placeholder',
      owner: Firebase.auth().currentUser.uid,
      pinColor
    };
    Firebase.database().ref(PATH_NEGOZI).push(newStore);
    dispatch({ type: NUOVO_NEGOZIO_CARICATO, alert: 'Hai aggiunto un nuovo negozio!' });
    const newAlert = false;
    navigation.navigate('mappa', { newAlert });
};

export const modificaNegozio =
  (dispatch, coords, descrizione, image, nome, tipologia, pinColor, navigation, id) => {
    const updatedStore = {
      coords,
      descrizione,
      image,
      nome,
      tipologia,
      followers: 'placeholder',
      owner: Firebase.auth().currentUser.uid,
      pinColor
    };
    Firebase.database().ref(PATH_NEGOZI.concat(`/${id}`)).update(updatedStore); //`: codice ASCII 96
    dispatch({ type: NEGOZIO_MODIFICATO, alert: 'Dati del negozio modificati con successo!' });
    const newAlert = false;
    navigation.navigate('mappa', { newAlert });
  };

  export const eliminaNegozio = async (dispatch, id, navigation) => {
    await Firebase.database().ref(PATH_NEGOZI.concat(`/${id}`)).remove();
    dispatch({
      type: NEGOZIO_ELIMINATO,
      alert: 'Fatto! Il negozio è stato rimosso dall\'archivio'
    });
    const newAlert = false;
    navigation.navigate('mappa', { newAlert });
  };

  export const aggiornaRegioneMapView = (dispatch, region) => {
    const action = {
      type: CAMBIA_REGIONE_MAPPA,
      region
    };
    return dispatch(action);
  };

  export const aggiornAlert = (dispatch, alert) => {
    const action = {
      type: AGGIORNA_ALERT,
      alert
    };
    return dispatch(action);
  };
