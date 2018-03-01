import React, { Component } from 'react';
import { Text, TextInput, StyleSheet, Image, Dimensions, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import { loginRequest, setError } from '../actions/AuthActions';
import Button from '../components/Button';

const img = require('../../assets/Logo.jpg');

const { width } = Dimensions.get('window');

class Login extends Component {
  static navigationOptions = {
    title: 'Benvenuto!',
    headerLeft: null
  }

  state = {
    email: '',
    password: ''
  };

  navigaVerso = this.props.navigation;

  renderLoginOrSpinner() {
    if (this.props.isLoading) return <Spinner />;

    return (
        <Button
          nome='Accedi'
          callback={async () =>
            await this.props.loginRequest(this.state.email, this.state.password, this.navigaVerso)
          }
        />
    );
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={stile.wrapper}>
        <Image source={img} style={stile.logo} />
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
        <Text>{this.props.error.message}</Text>
        {this.renderLoginOrSpinner()}
        <Button
          nome='Registrati'
          callback={() => {
            this.props.setError('');
            this.navigaVerso.navigate('signin');
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}

const stile = StyleSheet.create({
  wrapper: {
    margin: 10,
    flex: 1,
    justifyContent: 'center'
  },
  textinput: { padding: 5 },
  logo: {
    width: width - 20,
    marginBottom: 10
  }
});

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  error: state.auth.error,
  token: state.notify.token
});

const mapDispatchToProps = dispatch => ({
  loginRequest: (email, password, navigaVerso) =>
    loginRequest(dispatch, email, password, navigaVerso),
  setError: (msg) => setError(dispatch, msg)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
