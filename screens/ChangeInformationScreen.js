import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerStyles, forgotPasswordStyles, loginStyles } from '../styles/styles';
import { Input } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { auth } from '../database/firebase';
import { updateProfile } from "firebase/auth";

  const ChangeInformationScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('')
    const [urlPhoto, setURLPhoto] = useState('')

    //Firebase
    const updateUser = () => {
        updateProfile(auth.currentUser, {
            displayName: name, 
            //photoURL: urlPhoto
            }).then(() => {
            alert('Tu nombre ha sido actualizado exitosamente')
            navigation.navigate("Settings")
            }).catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage)
            });
    }

  return (
    <View style={[registerStyles.container]}>
      <StatusBar backgroundColor={'#020202'} translucent={true}/>
      <View style={{paddingTop: '10%'}}>
        <FontAwesome5 name="user" size={100} color="#ea071d" />
      </View>
      <View style={registerStyles.logo}>
        <Text style={{
          color: "#020202",
          fontSize: 25,
          fontWeight: 'bold',
          fontStyle: 'italic'
        }}>Cambiar tu Informacion</Text>
      </View>
      <Input 
      type='name' 
      placeholder='Nombre Completo' 
      value={name}
      onChangeText={text => setName(text)}
      style={{
        paddingTop:'10%'
      }}
      />
      {/* <Input 
      type='url' 
      placeholder='URL de tu imagen de perfil' 
      value={urlPhoto}
      onChangeText={text => setURLPhoto(text)}
      /> */}
      <View
        style={[forgotPasswordStyles.forgotContainer]}>
            <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            style={[forgotPasswordStyles.touchableItem]}
            >
                <Text style={[loginStyles.navigationText]}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={updateUser}
            style={[forgotPasswordStyles.touchableItem]}
            >
                <Text style={[loginStyles.navigationText]}>Confirmar</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ChangeInformationScreen;