import React from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import Button from '../components/Button';
import { vaiAlNegozio } from '../actions/MapActions';

const mapStateToProps = (state) => ({
  listaNegozi: state.map.negozi,
  token: state.notify.token,
  region: state.map.region
});

const mapDispatchToProps = (dispatch) => ({
  vaiAlNegozio: (coords, region, navigation) => vaiAlNegozio(dispatch, coords, region, navigation)
});

class FollowedList extends React.Component {

  static navigationOptions = {
      title: 'I miei negozi'
    };

  getUserID() {
    const { currentUser } = Firebase.auth();
    return currentUser.uid;
  }

  mapObject(object, callback) {  //funzione ausiliaria che serve a mostrare tutti i pulsanti
    return Object.keys(object).map((key) => {
      const buttonViewer = callback(key, object[key]);
      return buttonViewer;
    });
  }

  followed(id, Negozio) {
    if (Negozio.followers.indexOf(this.props.token) > 0) {  //Se l'utente sta seguendo il negozio:
      return (
        <Button
          key={id}
          nome={Negozio.nome}
          callback={() =>
            this.props.vaiAlNegozio(Negozio.coords, this.props.region, this.props.navigation)}
        />
      );
    }
  }

  mine(id, Negozio) {
    if (Negozio.owner === this.getUserID()) {  //Se l'utente è il proprietario
      return (
        <Button
          key={id}
          nome={Negozio.nome}
          callback={() =>
            this.props.vaiAlNegozio(Negozio.coords, this.props.region, this.props.navigation)}
        />
      );
    }
  }

  render() {
    const contenuto = (
      <ScrollView>
        <Text style={stile.text}>I tuoi negozi:</Text>
        {this.mapObject(
          this.props.listaNegozi,
          (id, Negozio) => this.mine(id, Negozio)
        )}
        <Button
          nome='Aggiungi una nuova attività!'
          callback={() => this.props.navigation.navigate('aggiungiNegozio')}
          color='green'
        />
        <Text style={stile.text}>Negozi che segui:</Text>
        {this.mapObject(
          this.props.listaNegozi,
          (id, Negozio) => this.followed(id, Negozio)
        )}
      </ScrollView>
    );
    return contenuto;
  }
}

const stile = {
  text: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    fontSize: 18
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowedList);
