import React from 'react';
import {
  Appbar,
  PaperProvider,
  Text,
  TextInput,
  Button,
} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, View, Platform, Linking} from 'react-native';

function App(): React.JSX.Element {
  const [latitude, setlatitude] = React.useState('');
  const [longitude, setlongitude] = React.useState('');


  const launchMap = () => {
    const location = `${longitude},${latitude}`;
    const url = Platform.select({
      android: `geo:${location}?center=${location}&q=${location}&q=${location}&z=5`,
    });
    Linking.openURL(url);
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <PaperProvider>
        <Appbar.Header style={styles.headerCol}>
          <Appbar.Content title="Launch Map" />
        </Appbar.Header>
        <View style={styles.text}>
          <TextInput
            activeUnderlineColor="#000000"
            outlineColor="#fff0f3"
            selectionColor="#fff0f3"
            activeOutlineColor="#000000"
            textColor="#000000"
            onChangeText="#000000"
            placeholderTextColor="#000000"
            mode="outlined"
            style={[styles.inputContainerStyle, styles.fontSize]}
            label={<Text style={styles.inputLabelText}>Enter Latitude</Text>}
            placeholder="Type Value"
            value={latitude}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            onChangeText={setlatitude}
          />
          <TextInput
            activeUnderlineColor="#000000"
            outlineColor="#fff0f3"
            selectionColor="#fff0f3"
            activeOutlineColor="#000000"
            textColor="#000000"
            onChangeText="#000000"
            placeholderTextColor="#000000"
            mode="outlined"
            style={[styles.inputContainerStyle, styles.fontSize]}
            label={<Text style={styles.inputLabelText}>Enter Longitude</Text>}
            placeholder="Type Value"
            value={longitude}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            onChangeText={setlongitude}
          />
        </View>
        <View style={styles.Button}>
          <Button 
            buttonColor="#000000"
            textColor="#e63462"
            mode="contained-tonal"
            onPress={launchMap}>
            Search
          </Button>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up the full height of the screen
    backgroundColor: '#333745', // Replace with your desired background color
  },
  headerCol: {
    backgroundColor: '#e63462', // Replace with your desired background color
  },
  text: {
    margin: 20,
  },
  inputContainerStyle: {
    margin: 8,
    backgroundColor: '#e63462', // Replace with your desired background color
  },
  fontSize: {
    fontSize: 20,
  },
  inputLabelText: {
    color: '#fff0f3',
  },
  Button: {
    marginLeft: 55,
    width: 280,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default App;
