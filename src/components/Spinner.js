import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
  const s = (
    <View style={styles.spinner}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
  return s;
};

const styles = {
  spinner: {
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default Spinner;
