
import React from 'react';
// import useAxios from 'axios-hooks';

import Map from './Map';

// function App() {
//   // const [visible, setVisible] = React.useState(false);
//   // const showDialog = () => setVisible(true);
//   // const hideDialog = () => setVisible(false); 
//   // const [cityName, setcityName] = React.useState('');


//   // const [{data, loading, error}, refetch] = useAxios(
//   //   'https://nominatim.openstreetmap.org/search?city=Helsinki&format=json&limit=1'
//   // );


//   <Map />


// export default App;

const App = () => <Map />;

export default App;

// return <Map />;

// <SafeAreaProvider>
{
  /* <PaperProvider>
        <Appbar.Header style={{backgroundColor: '#6B9080'}}>
          <Appbar.Content title="Map" />
          <Appbar.Action icon="magnify" onPress={showDialog} />
        </Appbar.Header>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Add City</Dialog.Title>
            <Dialog.Actions>
              <Dialog.Content>
                <TextInput
                  label="Enter city Name"
                  value={Text}
                  mode="flat"
                  onChangeText={setcityName}
                />
              </Dialog.Content>
              <Button onPress={() => console.log('Cancel')}>Cancel</Button>
              <Button onPress={() => console.log('Ok')}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {loading && (
          <Card>
            <Card.Content>
              <Text style={styles.text}>Loading...</Text>
            </Card.Content>
          </Card>
        )}

        {error && (
          <Card>
            <Card.Content>
              <Text style={styles.text}>Error: error fecthing the data</Text>
            </Card.Content>
          </Card>
        )}
        {data && data[0] && (
           <MapView
           style={StyleSheet.absoluteFillObject}
           initialRegion={{
             latitude: 37.78825,
             longitude: -122.4324,
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0421,
           }}
         />
        )}
      </PaperProvider> */
}
    // </SafeAreaProvider>
  // );
// }


// export default App;
