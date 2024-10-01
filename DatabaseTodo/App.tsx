import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider, Appbar, Button, TextInput} from 'react-native-paper';
import Realm from 'realm';
import {BSON} from 'realm';

const TodoSchema = {
  name: 'Todo',
  primaryKey: '_id',
  properties: {
    _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
    Text: 'string',
  },
};

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [realm, setRealm] = useState(null);
  const [data, setData] = useState<{_id: string; Text: string}[]>([]);
  const [item, setItem] = useState('');
  const [loaded, setLoaded] = useState(false);

  const app = new Realm.App({id: 'application-0-otmhdqy'});

  const connectToRealm = async () => {
    if (realm) return realm;

    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    const realmInstance = await Realm.open({
      schema: [TodoSchema],
      sync: {
        user: user,
        flexible: true, // Enable flexible sync
      },
    });
    setRealm(realmInstance);
    setIsConnected(true);
    return realmInstance;
  };

  useEffect(() => {
    const initializeRealm = async () => {
      try {
        const realmInstance = await connectToRealm();

        // Update subscriptions (Flexible Sync)
        await realmInstance.subscriptions.update((mutableSubs) => {
          const store = realmInstance.objects('Todo');
          mutableSubs.add(store);
        });

        // Fetch all data
        const allData = realmInstance.objects('Todo');
        const dataList = allData.map((todo) => ({
          _id: todo._id.toHexString(),
          Text: todo.Text,
        }));
        setData(dataList);

        // Handle Realm changes
        realmInstance.addListener('change', () => {
          const updateTodo = realmInstance.objects('Todo');
          setData(
            updateTodo.map(todo => ({
              _id: todo._id.toHexString(),
              Text: todo.Text,
            })),
          );
        });

        // Clean up
        return () => {
          realmInstance.removeAllListeners();
          realmInstance.close();
        };
      } catch (error) {
        console.log('Failed to fetch Todo data', error);
      } finally {
        setLoaded(true);
      }
    };

    initializeRealm();
  }, []);

  const addTodo = async () => {
    if (item.trim() === '') {
      console.error('Invalid Input');
      return;
    }

    try {
      const realm = await connectToRealm();

      realm.write(() => {
        realm.create('Todo', {Text: item});
      });
      Keyboard.dismiss();
    } catch (error) {
      console.log('Failed to add item', error);
    }

    setItem('');
  };


  const deleteItem = async (id: string) => {
    console.log('Deleting item');
    
    try {
      const realmInstance = await connectToRealm();

      realmInstance.write(() => {
        const deleteItem = realmInstance.objectForPrimaryKey('Todo', new Realm.BSON.ObjectId(id));

        if (deleteItem) {
          realmInstance.delete(deleteItem);
        } else {
          console.warn('Item is not found');
        }
      })
    }
    catch (error) {
      console.log('Failed to delete item', error);
    }
  }


  if (!loaded) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#25d366" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar backgroundColor="#000000" />
      <PaperProvider>
        <Appbar.Header style={styles.header} mode="center-aligned">
          <Appbar.Content color="#000000" title="Todo Note" />
        </Appbar.Header>
        <View style={styles.text}>
          <TextInput
            activeUnderlineColor="#f7b267"
            outlineColor="#f7b267"
            selectionColor="#f7b267"
            activeOutlineColor="#f7b267"
            textColor="#f7b267"
            placeholderTextColor="#f7b267"
            label="Add todo"
            value={item}
            mode="outlined"
            onChangeText={(value) => setItem(value)} // Update text state on change
            style={{backgroundColor: '#000000'}}
          />
          <View style={styles.button}>
            <Button
              buttonColor="#25d366"
              textColor="#000000"
              mode="contained"
              onPress={addTodo}>
              Add
            </Button>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id.toString()} // Convert id to string
            renderItem={({item}) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.Text}</Text>
                <TouchableOpacity onPress={() => deleteItem(item._id)}>
                  <Text style={styles.deleteText}>X</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#14213d'
  },
  header: {
    backgroundColor: '#fca311',
  },
  button: {
    marginTop: -50,
    marginLeft: '100%',
    width: '30%',
  },
  data: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
  },
  text: {
    marginTop: 20,
    marginLeft: 10,
    width: '75%',
  },
  itemContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  deleteText: {
    fontSize: 20,
    color: 'red',
  },
  itemText: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default App;

