import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MovieScreen from './MovieScreen';
import MovieDetails from './MovieDetails';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MovieScreen"
          component={MovieScreen}
          options={{
            title: 'MovieList',
            headerStyle: {backgroundColor: '#373A40'},
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetails}
          options={{
            title: 'MovieDetails',
            headerStyle: {backgroundColor: '#373A40'},
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
