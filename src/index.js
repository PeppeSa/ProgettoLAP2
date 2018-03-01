import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Firebase from 'firebase';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Mappa from './screens/Mappa';
import Login from './screens/Login';
import Registrazione from './screens/Registrazione';
import Reducer from './reducers';
import FollowedList from './screens/FollowedList';
import NewStore from './screens/AggiungiNegozio';
import EditStore from './screens/ModificaNegozio';
import InviaNotifiche from './screens/InviaNotifiche';
import DescrizioneNegozio from './screens/DescrizioneNegozio';

console.ignoredYellowBox = ['Setting a timer'];

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBsMX80f3--rdoCi7IjA1lzv2O7qJRp3tY',
      authDomain: 'progettolap2-7b106.firebaseapp.com',
      databaseURL: 'https://progettolap2-7b106.firebaseio.com',
      projectId: 'progettolap2-7b106',
      storageBucket: 'progettolap2-7b106.appspot.com',
      messagingSenderId: '1017524868890'
    };
    Firebase.initializeApp(config);
  }

  render() {
    const store = createStore(Reducer, applyMiddleware(ReduxThunk));

    const SecondaryNavigator = TabNavigator({
      mappa: { screen: Mappa },
      followedList: { screen: FollowedList }
    }, {
      tabBarPosition: 'bottom',
      animationEnabled: true
    });

    const MainNavigator = StackNavigator({
      login: { screen: Login },
      signin: { screen: Registrazione },
      logged: { screen: SecondaryNavigator },
      aggiungiNegozio: { screen: NewStore },
      modificaNegozio: { screen: EditStore },
      notify: { screen: InviaNotifiche },
      homeNegozio: { screen: DescrizioneNegozio }
    });

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
