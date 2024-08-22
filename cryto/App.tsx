import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const handleTouchStart = () => {
    console.log('Touch Start');
  };

  const handleTouchEnd = () => {
    console.log('Touch End');
  };

  return (
    <View style={styles.container}>
        <Text>Press Me</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
  },
});

export default App;
