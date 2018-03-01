import Firebase from 'firebase';
import {
  Alert
} from 'react-native';
import { aggiornAlert } from './MapActions';

export function toggleFollow(dispatch, id, Negozio, token, navigation) {
  const mirrorNegozio = Negozio;
  if (Negozio.followers.indexOf(token) >= 0) {
    mirrorNegozio.followers =
      mirrorNegozio.followers.replace(', '.concat(token), '');
    aggiornAlert(dispatch, 'Non segui più il negozio');
  } else {
    mirrorNegozio.followers =
      mirrorNegozio.followers.concat(', '.concat(token));
    aggiornAlert(dispatch, 'Stai seguendo il negozio!');
  }
  Firebase.database().ref(`/Negozi/${id}`)
    .update(mirrorNegozio);
  const aggiornato = true;
  navigation.navigate('homeNegozio', { id, Negozio, token, aggiornato });
}

export function impostaIcona(Negozio, token) {
  let s;
  if (Negozio.owner !== Firebase.auth().currentUser.uid) {
    if (Negozio.followers.indexOf(token) > 0) {
      s = 'star';
    } else {
      s = 'star-border';
    }
  } else {
    s = 'edit';
  }
  return s;
}

export function gestisciToccoCallout(id, Negozio, token, icona, navigation, toast, DURATION) {
  switch (icona) {
    case 'star': case 'star-border': {
      const aggiornato = false;
      navigation.navigate('homeNegozio', { id, Negozio, token, aggiornato });
      break;
    }
    case 'edit': {
      Alert.alert('Scelta operazione',
        'Vuoi inviare un messaggio agli iscritti o vuoi modificare i dati del negozio?',
        [
          {
            text: 'Annulla',
            color: 'red'
          },
          {
            text: 'Invia notifica',
            onPress: () => navigation.navigate('notify', { Negozio })
          },
          {
            text: 'Modifica dati',
            onPress: () => navigation.navigate('modificaNegozio', { Negozio, id })
          }

        ]
      );
      break;
    }
    default: {
      toast.show('Si è verificato un errore!', DURATION.LONG_DELAY);
    }
  }
}
