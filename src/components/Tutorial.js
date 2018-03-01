import React from 'react';
import { Alert } from 'react-native';
import IconButton from './IconButton';

const Tutorial = () => {
  let testoTutorial = 'Le principali funzionalità di quest\'app sono:\n';
  testoTutorial = testoTutorial.concat(' - Cliccando su un\'anteprima di un negozio (clicca sul marker posto sul punto nella mappa in cui si trova fisicamente il negozio per aprire l\'anteprima), puoi raggiungere la pagina di descrizione di quel negozio. Da li, oltre che poter vedere immagine di anteprima e descrizione del negozio, è possibile aggiungere il negozio alla lista dei negozi che segui, in questo modo riceverai tutte le notifiche del negozio stesso.\n');
  testoTutorial = testoTutorial.concat(' - Se possiedi un\'attività, cliccando sulla barra in basso alla voce "I miei negozi" avrai la possibilità di aggiungere il tuo negozio tramite il pulsante "Aggiungi nuovo negozio".\n');
  testoTutorial = testoTutorial.concat(' - Per modificare un negozio di cui si è i proprietari, basta cliccare sulla callout del negozio come si farebbe quando si vuole aprire l\'anteprima di un qualsiasi altro negozio; in questo caso, invece, viene chiesto se si desidera inviare una notifica agli utenti che seguono il negozio o se si vuole invece modificare l\'anteprima dello stesso.');

  return (
    <IconButton
      nome='help'
      callback={() => Alert.alert(
          'Guida',
          testoTutorial
        )
      }
    />
  );
};

export default Tutorial;
