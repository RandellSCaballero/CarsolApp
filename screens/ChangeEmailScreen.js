import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerStyles, forgotPasswordStyles, loginStyles } from '../styles/styles';
import { Input } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { auth } from '../database/firebase';
import { updateEmail } from 'firebase/auth';

  const ChangeEmailScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [newEmail, setNewEmail] = useState('')

    //Firebase
    const handleSignOut = () => {
      auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
    }
    
    const updateUserEmail = () => {
      if (auth.currentUser.email === email) {
      updateEmail(auth.currentUser, newEmail)
      .then(() => {
        alert('Correo reestablecido');
        handleSignOut();
        }).catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage)
        });
      } else {
        alert('Porfavor asegurese de ingresar su correo correctamente')
      }
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
        }}>Cambiar Correo</Text>
      </View>
      <Input 
      type='email' 
      placeholder='Correo Actual' 
      value={email}
      onChangeText={text => setEmail(text)}
      style={{
        paddingTop:'10%'
      }}
      />
      <Input 
      type='email' 
      placeholder='Nuevo Correo' 
      value={newEmail}
      onChangeText={text => setNewEmail(text)}
      />
      <View
        style={[forgotPasswordStyles.forgotContainer]}>
            <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            style={[forgotPasswordStyles.touchableItem]}
            >
                <Text style={[loginStyles.navigationText]}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={updateUserEmail}
            style={[forgotPasswordStyles.touchableItem]}
            >
                <Text style={[loginStyles.navigationText]}>Confirmar</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ChangeEmailScreen;