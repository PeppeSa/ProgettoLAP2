import React from 'react';
import { MapView } from 'expo';
import {
  Dimensions,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import {
  impostaIcona,
  gestisciToccoCallout
} from '../actions/CalloutActions';

const { width } = Dimensions.get('window');

function mapObject(object, callback) {  //funzione ausiliaria che serve a mostrare tutti i marker
  return Object.keys(object).map((key) => {
    const markerViewer = callback(key, object[key]);
    return markerViewer;
  });
}

function MarkerSingolo(id, Negozio, token, navigation, toast, DURATION) {
  const icona = impostaIcona(Negozio, token);
  return (
    <MapView.Marker
      key={id}
      coordinate={Negozio.coords}
      pinColor={Negozio.pinColor}
      ref={ref => { this.marker = ref; }}
    >
      <MapView.Callout
        onPress={() =>
          gestisciToccoCallout(
            id,
            Negozio,
            token,
            icona,
            navigation,
            toast,
            DURATION
          )
        }
      >
        <View style={stile.wrapper}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={stile.titoloMarker}>{Negozio.nome}</Text>
            <MaterialIcons style={stile.icon} size={20} color='blue' name={icona} />
          </View>
          <Text style={stile.tipologia}>{Negozio.tipologia}</Text>
        </View>
      </MapView.Callout>
    </MapView.Marker>
  );
}

const Markers = ({ negozi, token, navigation, toast, DURATION }) => {
                  const ris = mapObject(negozi, (id, Negozio) =>
                                MarkerSingolo(id, Negozio, token, navigation, toast, DURATION));
                  return (ris);
};

const stile = StyleSheet.create({
  wrapper: {
    maxWidth: width / 2
  },
  titoloMarker: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  tipologia: {
    color: 'grey'
  },
  icon: {
    alignSelf: 'center'
  },
  image: {
    height: 100,
    resizeMode: 'contain'
  }
});

export default Markers;
