import React from "react";
import {useState, type PropsWithChildren} from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";


function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}> List Your Todo</Text>
    </View>
  );
}

const TodoList = () => {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);

  const AddTodoItem = () => {
    if (itemText !== "") {
      setItems([...items, {id: Math.random(), text: itemText}]);
      setItemText("");
    }
    Keyboard.dismiss();
  };

  const RemoveItem = (id) => {
    const newItem = items.filter(item => item.id !== id);
    setItems(newItem)
  }

  return (
    <View>
      <View style={styles.inputArea}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="List your Tasks...."
          onChangeText={text => setItemText(text)}
          value={itemText}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={AddTodoItem}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
    <ScrollView style={styles.todoList}>
      {items.map((item,index) => (
        <View key={index} style={styles.listItem}>

          <Text style={styles.listItemText}> ¤ {item.text}</Text>
          <Text
          style={styles.listItemDelete}
          onPress={() => RemoveItem(item.id)}> X </Text>
        </View>
      ))}
    </ScrollView>
    </View>
  );
};

// App fcuntion
function App() {
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="#212121" />
      <Header />
      <View>
        <TodoList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    backgroundColor: "#212121",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 70,
  },

  headerText: {
    fontFamily: "Helvetica",
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
  },

  listItem: {
    flex: 1, 
    flexDirection: 'row',
    margin: 5
  },

  listItemText: {
    color:'white',
    backgroundColor:'black',
  },

  listItemDelete: {
    marginStart: 10,
    color: 'red',
    fontWeight: 'bold'
  },

  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },

  button: {
    height: 50,
    width: 60,
    justifyContent: "center",
    borderRadius: 9,
    backgroundColor: "#CF3A24",
  },

  todoList:{
    margin: 15,
  },

  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    alignSelf: "center",
  },

  input: {
    height: 50,
    width: 300,
    fontSize: 20,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderColor: "#2d3436",
    borderRadius: 9,
    color: "#2d3436",
    backgroundColor: "#ffffff",
  },
});

export default App;
