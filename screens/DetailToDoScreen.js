import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import { firebase, database } from '../database/firebase'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { ScrollView } from 'react-native'
import CustomHistoryItem from '../components/CustomHistoryItem'
import { ToDosStyles } from '../styles/styles'

const DetailToDoScreen = ({navigation, route}) => {
    const todoRef = firebase.firestore().collection('todos')
    const textHeading = route.params.item.heading;
    const [descriptionItem, setDescriptionItem] = useState('');
    const [logs, setLogs] = useState([]);
    const navigate = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({
        title: "Detalles de Pendiente",
        headerStyle: { backgroundColor: "#ea071d" },
        headerTintColor: "#ffffff",
      });
    }, [navigation])

    const addLog = () => {
      if(descriptionItem && descriptionItem.length > 0) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
          logDescription: descriptionItem,
          createdAt: timestamp,
        }
        database.collection('todos')
        .doc(route.params.item.id)
        .collection('history')
        .add(data)
        .then()
        .catch((error) =>{
          alert(error)
        })
      }
    }

    useEffect(() => {
      database.collection('todos')
      .doc(route.params.item.id)
      .collection('history')
      .orderBy('createdAt', 'asc')
      .onSnapshot(
        querySnapshot => {
          const logeos = []
          querySnapshot.forEach((doc) => {
            const { createdAt, logDescription } = doc.data()
            logeos.push({
              id: doc.id,
              createdAt,
              logDescription
            })
          })
          setLogs(logeos)
        }
      )
    }, [])

    const updateToDos = () => {
      if(descriptionItem && descriptionItem.length > 0) {
        todoRef
        .doc(route.params.item.id)
        .update({
          heading: textHeading,
          description: descriptionItem
        })
        .then(() => {
          addLog()
          alert('¡Pendiente Actualizado!')
          navigate.goBack()
        }).catch((error) => {
          alert(error.message)
        })
      }
    }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
        {route.params.item.heading}
        </Text>
      </View>
      <TextInput
        style={styles.textField}
        value={descriptionItem}
        onChangeText={text => setDescriptionItem(text)}
        placeholder={'Actualizar Pendiente'}
      />
      <Text style={styles.text}>Historial</Text>
      <ScrollView style={ToDosStyles.scrollViewContainer}>
      {logs.map(({id, logDescription, createdAt}) => (
              <CustomHistoryItem 
              key={id} 
              id={id} 
              logDescription={logDescription}
              createdAt={createdAt}
              />
            ))}
      </ScrollView>
      <View style={{paddingTop: 5}}>
        <Text style={{color:'black', fontWeight: '600', fontSize: 18}}>
          Creado en: {moment(route.params.item.createdAt.toDate()).format('MMMM Do YYYY, h:mm a')}
        </Text>
      </View>
      <Pressable
        style={styles.buttonUpdate}
        onPress={() => {updateToDos()}}
      >
        <Text style={{color: 'white', fontWeight: '600'}}>
          Actualizar Pendiente
        </Text>
      </Pressable>
    </View>
  )
}

export default DetailToDoScreen

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    marginLeft: 15,
    marginRight: 15
  },
  titleContainer: {
    paddingBottom:10,
  },
  title: {
    color: "black",
    fontWeight: "700",
    fontSize: 20,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
    color: 'gray'
  },
  textField: {
    marginBottom: 10,
    padding: 10,
    fontSize:15,
    color: '#000000',
    backgroundColor: "#e0e0e0",
    height: 70,
    fontWeight:'700',
    borderRadius:5
  },
  buttonUpdate: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius:4,
    elevation:10,
    backgroundColor: '#ea071d'
  }
})