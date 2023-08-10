import React, { useEffect, useState } from 'react';
import {Text, View} from 'react-native';
import { Input } from 'react-native-elements';
import { db } from '../database/firebase';
import { doc, setDoc } from "firebase/firestore";

const CompleteInfo = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const SubmitInfo = () => {
        setDoc(doc(db, "users"), {
            firstName: firstName,
            lastName: lastName
          });
    }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>¡Terminemos de ingresar tu informacion!</Text>
      <Input 
        type='firstName' 
        placeholder='Primer Nombre'
        value={firstName}
        onChangeText={text => setFirstName(text)}
        />
        <Input 
        type='lastName' 
        placeholder='Apellido'
        value={lastName}
        onChangeText={text => setLastName(text)}
        />
        <TouchableOpacity
        onPress={SubmitInfo}
        style={{
          backgroundColor: "#ea071d",
          padding: 10,
          marginTop: "10%",
          width: "50%",
          alignSelf: "center",
          borderRadius: 20
        }}
      >
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            color: "#ffffff"
          }}
        >
          Agregar Informacion
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompleteInfo;