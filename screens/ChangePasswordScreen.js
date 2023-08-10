import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerStyles, forgotPasswordStyles, loginStyles } from '../styles/styles';
import { Input } from 'react-native-elements';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { auth } from '../database/firebase'
import { updatePassword, reauthenticateWithCredential } from 'firebase/auth';

const ChangePasswordScreen = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [ReNewPassword, setReNewPassword] = useState('')
    const [isSecureEntry, setSecureEntry] = useState(true);
    const [isSecureEntryConfirm, setSecureEntryConfirm] = useState(true);
    const [isSecureEntryAffirm, setSecureEntryAffirm] = useState(true);

    //Firebase
    const handleSignOut = () => {
      auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
    }

    const onChangePasswordPress = () => {
      var user = auth.currentUser;
      if(newPassword === ReNewPassword && password !== newPassword){
        updatePassword(user, newPassword)
        .then(() => {
            alert('Contraseña reestablecida');
            handleSignOut();
        }).catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage)
        });
      } else {
        alert('Porfavor revisar la informacion ingresada')
      }
    }

    // reauthenticateWithCredential(password)
    
    // .then(() => {
      
    // })
    // .catch((error) => {

    // })

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
        }}>Cambiar Contraseña</Text>
      </View>
      <Input 
      type='password' 
      placeholder='Contraseña Actual' 
      secureTextEntry={isSecureEntry}
      rightIcon=
      { <TouchableOpacity onPress={() => {
        setSecureEntry((prev) => !prev)
      }}>
          <Text>{isSecureEntry? <Feather name="eye" size={24} color="black" /> : <Feather name="eye-off" size={24} color="black" />}</Text>
        </TouchableOpacity>
      }
      value={password}
      onChangeText={text => setPassword(text)}
      />
      <Input 
      type='password' 
      placeholder='Nueva Contraseña' 
      secureTextEntry={isSecureEntryConfirm}
      rightIcon=
      { <TouchableOpacity onPress={() => {
        setSecureEntryConfirm((prev) => !prev)
      }}>
          <Text>{isSecureEntryConfirm? <Feather name="eye" size={24} color="black" /> : <Feather name="eye-off" size={24} color="black" />}</Text>
        </TouchableOpacity>
      }
      value={newPassword}
      onChangeText={text => setNewPassword(text)}
      />
      <Input 
      type='password' 
      placeholder='Re-Ingresar Nueva Contraseña' 
      secureTextEntry={isSecureEntryAffirm}
      rightIcon=
      { <TouchableOpacity onPress={() => {
        setSecureEntryAffirm((prev) => !prev)
      }}>
          <Text>{isSecureEntryAffirm? <Feather name="eye" size={24} color="black" /> : <Feather name="eye-off" size={24} color="black" />}</Text>
        </TouchableOpacity>
      }
      value={ReNewPassword}
      onChangeText={text => setReNewPassword(text)}
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
            onPress={onChangePasswordPress}
            style={[forgotPasswordStyles.touchableItem]}
            >
                <Text style={[loginStyles.navigationText]}>Confirmar</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ChangePasswordScreen;