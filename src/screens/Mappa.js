import { MapView } from 'expo';
import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import {
  aggiornaPosizione,
  richiestaPermessi,
  recuperaNegozi,
  permessoNegato,
  aggiornaRegioneMapView,
  aggiornAlert
} from '../actions/MapActions';
import { registerForPushNotificationsAsync } from '../actions/NotifyActions';
import Markers from '../components/Markers';
import IconButton from '../components/IconButton';
import Tutorial from '../components/Tutorial';

const { height } = Dimensions.get('window');

const mapStateToProps = (state) => ({
  region: state.map.region,
  permessi: state.map.permessi,
  alert: state.map.alert,
  negozi: state.map.negozi,
  token: state.notify.token
});

const mapDispatchToProps = (dispatch) => ({
    aggiornaPosizione: (region) => aggiornaPosizione(dispatch, region),
    richiestaPermessi: () => richiestaPermessi(dispatch),
    recuperaNegozi: async () =>
      await recuperaNegozi(dispatch),
    permessoNegato: () => permessoNegato(dispatch),
    registerForPushNotificationsAsync: () => registerForPushNotificationsAsync(dispatch),
    aggiornaRegioneMapView: (region) => aggiornaRegioneMapView(dispatch, region),
    aggiornAlert: (alert) => aggiornAlert(dispatch, alert)
});

class Mappa extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Mappa',
    headerLeft:
      <IconButton
        nome='input'
        callback={() => {
          Alert.alert(
            'Logout',
            'Sicuro di voler effettuare il logout?',
            [
              { text: 'Si', onPress: () => navigation.navigate('login') },
              { text: 'No' }
            ],
            { cancelable: false }
          );
        }}
      />,
    headerRight: <Tutorial />
  });

  state = {
    markers: () => null
  }

  async componentWillMount() {
    try {
      await this.props.registerForPushNotificationsAsync();
      await this.props.richiestaPermessi();
      if (this.props.permessi) {
        if (this.props.navigation.state.params.newAlert) {
          this.props.aggiornAlert('Vieni a trovarci!');
        }
        this.toast.show(this.props.alert, DURATION.LONG_DELAY);
        await this.props.recuperaNegozi();
        await this.props.aggiornaPosizione(this.props.region);
      } else {
        this.props.permessoNegato();
        this.toast.show(this.props.alert, DURATION.LONG_DELAY);
      }
    } catch (e) {
      Alert.alert(
        'Error: ',
        e.message,
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.navigate('login')
          }
        ],
        { cancelable: false }
      );
    }
  }

  componentWillReceiveProps() {
    this.setState({
      markers: () => (
        <Markers
          negozi={this.props.negozi}
          token={this.props.token}
          navigation={this.props.navigation}
          toast={this.toast}
          DURATION={DURATION}
        />
      )
    });
  }

  render() {
    return (
      <View style={stile.containerMappa}>
        <MapView
          style={stile.mappa}
          initialRegion={this.props.region}
          region={this.props.region}
          showsUserLocation
          onRegionChange={(region) => this.props.aggiornaRegioneMapView(region)}
        >
          {this.state.markers()}
        </MapView>
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
  containerMappa:
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mappa: {
    flex: 1,
    width: height,
    height
  },
  sideMenu: {
      alignItems: 'center',
      justifyContent: 'center'
  },
  toast: {
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Mappa);
