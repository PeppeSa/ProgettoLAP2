import {
  RICHIESTA_PERMESSI,
  PERMESSO_NEGATO,
  RECUPERA_NEGOZI,
  CAMBIA_REGIONE_MAPPA,
  NUOVO_NEGOZIO_CARICATO,
  NEGOZIO_MODIFICATO,
  NEGOZIO_ELIMINATO,
  AGGIORNA_ALERT
} from '../actions/types';
import {
  START_LATITUDE,
  START_LONGITUDE,
  LATITUDE_DELTA,
  LONGITUDE_DELTA
} from '../actions/final';

const initialState = {
  region:
  {
    latitude: START_LATITUDE,
    longitude: START_LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  },
  permessi: false,
  alert: 'Benvenuto!',
  negozi: {}
};

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case RICHIESTA_PERMESSI:
      return {
        ...state,
        permessi: action.permessi,
        isLoading: action.isLoading
      };

    case PERMESSO_NEGATO: case NUOVO_NEGOZIO_CARICATO:
    case NEGOZIO_MODIFICATO: case NEGOZIO_ELIMINATO:
    case AGGIORNA_ALERT:
      return {
        ...state,
        alert: action.alert
      };

    case RECUPERA_NEGOZI:
      return {
        ...state,
        negozi: action.payload || {}
      };

    case CAMBIA_REGIONE_MAPPA:
      return {
        ...state,
        region: action.region
      };

    default:
      return state;
  }
}
