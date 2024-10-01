import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps'; // Remove PROVIDER_GOOGLE if not using Google Maps

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const Map = () => (
  <View style={styles.container}>
    <MapView
      style={styles.map}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    />
  </View>
);

export default Map;
