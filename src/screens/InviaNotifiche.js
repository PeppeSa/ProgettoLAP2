import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import Button from '../components/Button';
import { mandaNotifica } from '../actions/NotifyActions';
import { aggiornAlert } from '../actions/MapActions';

const mapStateToProps = (state) => ({
  negozi: state.map.negozi
});

const mapDispatchToProps = (dispatch) => ({
  mandaNotifica: (token, title, body) => mandaNotifica(dispatch, token, title, body),
  aggiornAlert: (alert) => aggiornAlert(dispatch, alert)
});

class InviaNotifiche extends React.Component {

  static navigationOptions = {
    title: 'Invia una notifica agli iscritti'
  }

  state = {
    titolo: '',
    corpo: ''
  }

  data = this.props.navigation.state.params;

  render() {
    return (
      <View style={stile.wrapper}>
        <TextInput
          style={stile.textinput}
          label='Titolo notifica'
          placeholder='Titolo notifica'
          onChangeText={text => this.setState({ titolo: text })}
          value={this.state.titolo}
        />
        <TextInput
          style={stile.textinput}
          label='Corpo della notifica'
          placeholder='Corpo della notifica'
          onChangeText={text => this.setState({ corpo: text })}
          value={this.state.corpo}
          multiline
        />
        <Button
          nome='Invia notifica'
          callback={() => {
            if (this.state.titolo === '') {
              this.toast.show('Devi inserire il titolo!', DURATION.SHORT_DELAY);
              return;
            } else if (this.state.corpo === '') {
              this.toast.show('Devi inserire un messaggio!', DURATION.SHORT_DELAY);
              return;
            }
            const ArrayReturn = this.data.Negozio.followers.split(', ');
            this.props.aggiornAlert(
              'Nessuno riceverà la tua notifica perché nessuno sta seguendo il tuo negozio!'
            );
            for (let i = 1; i < ArrayReturn.length; i++) {
              this.props.mandaNotifica(
                ArrayReturn[i],
                this.state.titolo,
                this.state.corpo
              );
            }
            const newAlert = false;
            this.props.navigation.navigate('mappa', { newAlert });
          }}
        />
        <Toast
          ref={ref => { this.toast = ref; }}
          position='center'
          style={stile.toast}
          opacity={0.8}
        />
    </View>
    );
  }
}

const stile = StyleSheet.create({
  wrapper: {
    margin: 10
  },
  textinput: { padding: 5 },
  toast: {
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InviaNotifiche);
