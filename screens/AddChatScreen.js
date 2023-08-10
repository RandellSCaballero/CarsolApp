import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Input } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome"
import DropDownPicker from 'react-native-dropdown-picker';
import { auth, db } from '../database/firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false)
    const items = [
      {label: 'Mantenimiento General', value: 'Mantenimiento General'},
      {label: 'Cambio de Aceite', value: 'Cambio de Aceite'},
      {label: 'Revision de sistema de enfriamiento', value:'Revision de sistema de enfriamiento'},
      {label: 'Alineamiento y Balanceo', value: 'Alineamiento y Balanceo'},
      {label: 'Revision de sistema de frenos', value: 'Revision de sistema de frenos'},
    ]

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Nueva conversación',
            headerBackTitle: "Conversaciones",
            headerStyle: { backgroundColor: "#ea071d" },
            headerTintColor: "#ffffff",
        })
    }, [])

    const createChat = async () => {
        await addDoc(collection(db, "chats"), { 
            userId: auth?.currentUser.uid,
            chatName: input,
        }).then(() => {
            navigation.goBack()
        }).catch(error => alert(error))
    }

    return (
    <View style={styles.container}>
      {/* <Input 
      placeholder='Motivo de Contacto' 
      value={input} 
      onChangeText={(text) => setInput(text)}
      onSubmitEditing={createChat}
      leftIcon={
        <Icon 
          name="wechat" 
          type="antdesign" size={24} color="#020202"/>
          }
      /> */}
      <View>
      <Text style={styles.textStyle}>
        Seleccione un motivo de Contacto
      </Text>
      <DropDownPicker 
      items={items} 
      placeholder='Motivo de Contacto'
      open={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
      value={input}
      setValue={(val) => setInput(val)}
      maxHeight={200}
      autoScroll
      placeholderStyle={styles.placeHolder}
      disableBorderRadius={false}
      />
      </View>
      <Button
      buttonStyle={{
        borderRadius: 30,
        backgroundColor:'#ea071d',
      }} disabledStyle={{
        backgroundColor:'transparent'
      }} type='solid' disabled={!input} onPress={createChat} title="Crear nueva conversación"/>
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    textStyle: {
      color: '#020202',
      fontWeight: '500',
      paddingBottom: 10,
      fontSize: 16
    },
    placeHolder: {
      color: '#020202',
      fontWeight: '600',
      fontSize: 14
    }
})