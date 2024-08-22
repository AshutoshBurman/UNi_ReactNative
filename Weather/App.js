import React, {useState} from 'react';
import { StatusBar, StyleSheet, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context'; 
import { Button, Dialog, Portal, PaperProvider, Text, Provider, TextInput, Card} from 'react-native-paper';
import useAxios from 'axios-hooks';





function App() {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [cities, setCities] = useState([]);
  // const [delete, setDelete] = useState([]);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const addCity = () => {
    setCities([...cities, { id: Math.random(), name: text }]);
    setText('');
    hideDialog();
  };

  const deleteCity = (deleteCity) => {
    let filteredArray = cities.filter(city => city.id !== deleteCity.id);
    setCities(filteredArray);
  }

  const WeatherForcast = (params) => {
    const city = params.city;
    const API_KEY = '1e057c1a6e04a67c25566c46390d5240'
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  
  
    const [{data, loading, error}, refetch] = useAxios(
      'https://api.openweathermap.org/data/2.5/weather?q='+city.name+'&appid='+'1e057c1a6e04a67c25566c46390d5240'+'&units=metric'
    )
  
    if (loading) return (
      <Card>
        <Card.Content>
          <Text style={styles.text}>Loading...</Text>
        </Card.Content>
      </Card>
    )
  
    if (error) return (
      <Card>
        <Card.Content>
          <Text style={styles.text}>Error, while loading Weather forcaste!</Text>
        </Card.Content>
      </Card>
    )
    
    const refresfForcast = () =>{
      refetch();

    const delCity = () => {
      params.deleteCity(city.id);
    }

    }

    return(
      <Card style={styles.cardstyle}>
        <Card.Actions style={styles.text}>
        <Text variant="titleLarge">{city.name}</Text>
        <Text variant="bodyMedium">Temp: {data.main.temp}°C</Text>
        <Text variant="bodyMedium">Weather: {data.weather[0].main}</Text>
        <Button onPress={refresfForcast} >Refresh</Button>
        <Button onPress={delCity}>Delete</Button>
        </Card.Actions>
      </Card>
    )
  }
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@cities', JSON.stringify(cities));
    } catch (e) {
      // saving error
      console.log("Cities saving error!");
    }
  }
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@cities')
      if(value !== null) {
        setCities(JSON.parse(value));
      }
    } catch(e) {
      console.log("Cities loading error!");
    }
  }

  return (
    <PaperProvider style={styles.screen}>
      <StatusBar backgroundColor="#6B9080" barStyle="light-content" />
      <Appbar.Header style={{ backgroundColor: '#6B9080' }}>
        <Appbar.Content title="Weather" color="#000000" />
        <Appbar.Action icon="magnify" color="#000000" onPress={showDialog} />
      </Appbar.Header>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: '#EAF4F4' }}>
          <Dialog.Title>Add City</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="City name"
              value={text}
              mode="flat"
              backgroundColor="#EAF4F4"
              activeOutlineColor="#6B9080"
              activeUnderlineColor="#6B9080"
              onChangeText={setText}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={addCity} textColor="#6B9080">
              Add
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ScrollView>
        {cities.map((city) => (
          <Card >
            <Card.Actions>
              <WeatherForcast key={city.id} city={city} />
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#CCE3DE",
  },
  header: {
    backgroundColor: "#6B9080",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 70,
  },

  text:{
    color: "#000000",
    fontSize: 20,
    fontWeight: "500",
  },

  cardstyle:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAF4F4",
    height: 200,
    width: 300,
    margin: 10,

  },

  cardtext:{
    justifyContent: "",

  },

  headerText: {
    fontFamily: "Helvetica",
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
  },
})

export default App ;