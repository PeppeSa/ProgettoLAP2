import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { SlidersColorPicker } from 'react-native-color';
import Toast, { DURATION } from 'react-native-easy-toast';
import Button from '../components/Button';
import { creaNegozio } from '../actions/MapActions';

const { width } = Dimensions.get('window');

const mapStateToProps = (state) => ({
  region: state.map.region
});

const mapDispatchToProps = (dispatch) => ({
  creaNegozio: (coords, descrizione, image, nome, tipologia, pinColor, navigation, toast) =>
    creaNegozio(dispatch, coords, descrizione, image, nome, tipologia, pinColor, navigation, toast, DURATION)
});

class AggiungiNegozio extends React.Component {
  static navigationOptions = {
    title: "Aggiungi un nuovo negozio all'app!"
  }

  state = {
    nome: '',
    tipologia: '',
    descrizione: '',
    image: '',
    coords: {
      latitude: this.props.region.latitude,
      longitude: this.props.region.longitude
    },
    pinColor: '#123456',
    modalVisible: false,
    recenti: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654']
  }

  render() {
    return (
      <View style={stile.wrapper}>
        <TextInput
          style={stile.textinput}
          label='Nome negozio'
          placeholder='Nome negozio'
          onChangeText={text => this.setState({ nome: text })}
          value={this.state.nome}
          maxLength={50}
        />
        <TextInput
          style={stile.textinput}
          label='Tipo di negozio'
          placeholder='Tipo di negozio'
          onChangeText={text => this.setState({ tipologia: text })}
          value={this.state.tipologia}
          maxLength={50}
        />
        <TextInput
          style={stile.textinput}
          label='Breve descrizione del negozio'
          placeholder='Breve descrizione del negozio'
          onChangeText={text => this.setState({ descrizione: text })}
          value={this.state.descrizione}
          maxLength={300}
        />
        <TextInput
          style={stile.textinput}
          label="URL dell'immagine che rappresenta il negozio"
          placeholder="URL dell'immagine che rappresenta il negozio"
          onChangeText={text => this.setState({ image: text })}
          value={this.state.image}
        />
        <View>
          <MapView
            style={{ width, height: 300 }}
            initialRegion={this.props.region}
          >
            <MapView.Marker
              draggable
              coordinate={{
                latitude: this.props.region.latitude,
                longitude: this.props.region.longitude
              }}
              onDragEnd={(e) => {
                this.setState({ coords: {
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude
                  }
                });
              }}
              title={'Il tuo negozio'}
              pinColor={this.state.pinColor}
            />
          </MapView>
        </View>
        <Button
          nome='Cambia il colore del marker!'
          callback={() => this.setState({ modalVisible: true })}
          color={this.state.pinColor}
        />
        <SlidersColorPicker
            visible={this.state.modalVisible}
            color={this.state.pinColor}
            returnMode={'rgb'}
            onCancel={() => this.setState({ modalVisible: false })}
            onOk={colorRgb => {
              this.setState({
                modalVisible: false,
                pinColor: colorRgb
              });
              this.setState({
                recents: [
                  colorRgb,
                  ...this.state.recenti.filter(c => c !== colorRgb).slice(0, 4)
                ]
              });
            }}
            swatches={this.state.recenti}
            swatchesLabel="RECENTI"
            okLabel="Fatto"
            cancelLabel="Annulla"
        />
        <View>
          <Button
            nome='Crea'
            callback={() => {
              if (this.state.nome === '') {
                  this.toast.show('Devi inserire il nome!', DURATION.SHORT_DELAY);
                  return;
              } else if (this.state.tipologia === '') {
                this.toast.show('Devi inserire il tipo di attività!', DURATION.SHORT_DELAY);
                return;
              }
              this.props.creaNegozio(
                this.state.coords,
                this.state.descrizione,
                this.state.image,
                this.state.nome,
                this.state.tipologia,
                this.state.pinColor,
                this.props.navigation,
                this.toast
              );
            }}
          />
        </View>
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
    flex: 1,
    justifyContent: 'center',
    margin: 10
  },
  textinput: { padding: 5 },
  toast: {
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AggiungiNegozio);
