import { FlatList, StyleSheet, Button, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useState ,useReducer } from 'react';

function reducer(state, action){
  switch (action.type) {
    case 'ADD_TODO':
      const newState = [
        ...state, {
            id: Date.now().toString(),
            text: action.payload
        }
      ]
      console.log('ADDED TASK: ', newState)
      return newState;
    case 'REMOVE_TODO' :
      const filteredState = state.filter(task => task.id !== action.payload)
      console.log('REMOVED TASK: ', filteredState)
      return filteredState;
    default:
      throw new Error();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, [])
  const [task, setTask] = useState('')

  const addTodo = () => {
    dispatch({
      type: 'ADD_TODO',
      payload: task,
    });
    setTask('');
    console.log('Adding task: ',task)
  }

  return (
    <View style={styles.container}>
      <Text>To-do List</Text>
      <TextInput style={styles.input} placeholder='Add todo' value={task} onChangeText={setTask}/>
      <Button onPress={addTodo} title='Save'></Button>
      <FlatList
        data={state}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => dispatch({type: 'REMOVE_TODO', payload: item.id})}><Text style={styles.text}>{item.text}</Text></TouchableOpacity>)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  }
});
