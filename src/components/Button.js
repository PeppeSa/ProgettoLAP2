import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ nome, callback, color }) => {
  const colore = (color != null) ? (color) : ('black');
  return (
    <View style={stile.view}>
      <TouchableOpacity style={stile.touch} onPress={callback}>
        <Text color={colore}>{nome}</Text>
      </TouchableOpacity>
    </View>
  );
};

const stile = StyleSheet.create({
  view: {
    margin: 5,
    height: 50,
    flexDirection: 'row'
  },
  touch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Button.colore
  }
});

export default Button;
