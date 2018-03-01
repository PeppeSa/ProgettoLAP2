import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

const IconButton = ({ nome, callback, color }) => {
  const colore = (color != null) ? (color) : ('black');
  return (
    <View style={stile.view}>
      <TouchableOpacity style={stile.touch} onPress={callback}>
        <MaterialIcons
          name={nome}
          size={30}
          color={colore}
          style={stile.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const stile = StyleSheet.create({
  view: {
    padding: 5,
    width: 50,
    height: 50,
    flexDirection: 'row'
  },
  touch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    position: 'absolute',
    left: 10
  }
});

export default IconButton;
