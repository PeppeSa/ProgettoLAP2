import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import { connect } from 'react-redux';
import IconButton from '../components/IconButton';
import { toggleFollow, impostaIcona } from '../actions/CalloutActions';

const defaultImage = require('../../assets/icons/app.png');

const mapStateToProps = (state) => ({
  alert: state.map.alert
});

const mapDispatchToProps = (dispatch) => ({
    toggleFollow: (id, negozio, token, navigation) =>
      toggleFollow(dispatch, id, negozio, token, navigation)
});

class DescrizioneNegozio extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.Negozio.nome,
    headerLeft:
      <IconButton
        nome='arrow-back'
        callback={() => {
			const newAlert = true;
			navigation.navigate('mappa', { newAlert });
		}}
      />
  });

  componentDidMount() {
    if (this.data.aggiornato) {
      this.toast.show(this.props.alert, DURATION.LONG_DELAY);
    }
  }

  data = this.props.navigation.state.params;

  icona = impostaIcona(this.data.Negozio, this.data.token);
  image = this.impostaImmagine();

  impostaImmagine() {
    let ris = defaultImage;
    if (this.data.Negozio.image !== '') ris = { uri: this.data.Negozio.image };
    return ris;
  }

  render() {
    return (
      <ScrollView style={stile.wrapper}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={stile.tipologia}>{this.data.Negozio.tipologia}</Text>
          <IconButton
            nome={this.icona}
            callback={() =>
              this.props.toggleFollow(
                this.data.id,
                this.data.Negozio,
                this.data.token,
                this.props.navigation
              )
            }
            color='blue'
          />
        </View>
        <Image
          source={this.image}
          style={stile.image}
        />
        <Text style={stile.descrizione}>{this.data.Negozio.descrizione}</Text>
        <Toast
          ref={ref => { this.toast = ref; }}
          position='center'
          style={stile.toast}
        />
      </ScrollView>
    );
  }
}

const stile = StyleSheet.create({
  wrapper: {
    margin: 10,
    padding: 5
  },
  toast: {
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 10
  },
  image: {
    height: 200,
    resizeMode: 'contain'
  },
  titoloMarker: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  tipologia: {
    color: 'grey',
    margin: 10
  },
  descrizione: {
    margin: 5,
    marginTop: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DescrizioneNegozio);
