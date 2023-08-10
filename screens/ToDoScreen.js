import { StyleSheet, Text, Alert, FlatList, View, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../database/firebase'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

const twoOptions = (deleteToDo, item) => {
  Alert.alert(
      'Advertencia',
      '¿Deseas eliminar este pendiente?',
      [
        { text: 'Eliminar', onPress: () => deleteToDo(item)},
        { text: 'Cancelar', onPress: () => console.log('No') },
      ],
      { cancelable: true }
  )
}

const ToDoScreen = () => {
    const [toDos, setToDos] = useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({
        title: "Pendientes",
        headerStyle: { backgroundColor: "#ea071d" },
        headerTintColor: "#ffffff",
      });
    }, [navigation])

    //Fetch data 
    useEffect(() => {
      todoRef
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        querySnapshot => {
          const todos = []
          querySnapshot.forEach((doc) => {
            const {heading, createdAt, description} = doc.data()
            todos.push({
              id: doc.id,
              heading,
              createdAt,
              description
            })
          })
          setToDos(todos)
        }
      )
    }, [])

    //Delete a ToDo
    const deleteToDo = (todos) => {
      todoRef
      .doc(todos.id)
      .delete()
      .then(() => {
        alert("Borrado exitosamente")
      })
      .catch(error => {
        alert(error)
      })
    }

    //Add a ToDo
    const addToDo = () => {
      if(addData && addData.length > 0) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const description = 'Detalles del pendiente'
        const data = {
          heading: addData,
          createdAt: timestamp,
          description: description
        };
        todoRef
        .add(data)
        .then(() => {
          alert('¡Agregado exitosamente!')
          setAddData('')
          Keyboard.dismiss()
        })
        .catch((error) =>{
          alert(error)
        })
      }
    }
  return (
    <View style={{flex:1}}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Agregar Pendiente"
          placeholderTextColor='#aaaaaa'
          onChangeText={(heading) => setAddData(heading)}
          value={addData}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />
        <TouchableOpacity style={styles.button} onPress={addToDo}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={toDos}
        numColumns={1}
        renderItem={({item}) => (
          <View>
            <Pressable
              style={styles.container}
              onPress={() => navigation.navigate('Detail', {item})}
            >
              <FontAwesome
                name='trash-o'
                color='#ea071d'
                onPress={() => twoOptions(deleteToDo, item)}
                style={styles.todoIcon}
              />
              <View style={styles.innerContainer}>
                <Text style={styles.itemHeading}>
                  {item.heading[0].toUpperCase() + item.heading.slice(1)}
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}

export default ToDoScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: 25,
  },
  itemHeading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 22,
  },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginLeft: 10, 
    marginRight: 10,
    marginTop: 100,
  },
  input: {
    height: 48,
    borderRadius:5,
    overflow: 'hidden',
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#ea071d",
    width:80,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText: {
    color:'white',
    fontSize:14,
    fontWeight: '600'
  },
  todoIcon: {
    margin: 5,
    fontSize: 24,
    marginLeft: 14
  }
})