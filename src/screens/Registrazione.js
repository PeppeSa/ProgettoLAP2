import React, { Component } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import { registrationRequest, setError } from '../actions/AuthActions';
import Button from '../components/Button';

const img = require('../../assets/Registrazione.jpg');

const { width, height } = Dimensions.get('window');

class Login extends Component {
  static navigationOptions = {
    title: 'Form di registrazione',
    headerLeft: null
  }

  state = {
    email: '',
    password: '',
    repass: ''
  };

  navigaVerso = this.props.navigation;

  renderSignInOrSpinner() {
    if (this.props.isLoading) return <Spinner />;

    return (
      <Button
        nome='Registrati'
        callback={async () => {
          if (this.state.password === this.state.repass) {
            await this.props.registrationRequest(
                                this.state.email,
                                this.state.password,
                                this.navigaVerso
                              );
            Alert.alert('Fatto!',
              'Registrazione effettuata con successo! Ora puoi effettuare il login.');
          } else {
            Alert.alert('Errore', 'Le due password inserite devono coincidere!');
            this.props.setError('');
          }
        }}
      />
    );
  }

  render() {
    return (
        <View style={stile.wrapper}>
          <Image source={img} style={stile.image} resizeMode='contain' />
          <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={125}
          >
            <TextInput
              style={stile.textinput}
              label='E-mail'
              placeholder='E-mail'
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
            />
            <TextInput
              style={stile.textinput}
              secureTextEntry
              label='Password'
              placeholder='Password'
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
            />
            <TextInput
              style={stile.textinput}
              secureTextEntry
              label='Reinserisci la password'
              placeholder='Reinserisci la password'
              onChangeText={text => this.setState({ repass: text })}
              value={this.state.repass}
            />
          </KeyboardAvoidingView>
          <Text>{this.props.error.message}</Text>
          {this.renderSignInOrSpinner()}
          <Button
            nome='Annulla'
            callback={() => {
              this.props.setError('');
              this.navigaVerso.navigate('login');
            }}
          />
        </View>
    );
  }
}

const stile = StyleSheet.create({
  wrapper: {
    margin: 10,
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    maxWidth: width,
    maxHeight: height / 2
  },
  textinput: { padding: 5 },
  canvas: {}
});

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  error: state.auth.error,
  token: state.notify.token
});

const mapDispatchToProps = dispatch => ({
  registrationRequest: (email, password, navigaVerso) =>
    registrationRequest(dispatch, email, password, navigaVerso),
  setError: (msg) => setError(dispatch, msg)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
