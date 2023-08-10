import React, { useEffect, useState } from 'react';
import { auth } from '../database/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Text, TouchableOpacity, View, StatusBar, Switch } from 'react-native';
import { Input } from 'react-native-elements';
import { registerStyles } from '../styles/styles'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export default function Register() {
  const navigation = useNavigation();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [valPassword, setValPassword] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [isEnabled, setIsEnabled] = useState(false)
  //const [selectRole, setSelectRole] = useState('user');
  const [isSecureEntry, setSecureEntry] = useState(true);
  const [isSecureEntryConfirm, setSecureEntryConfirm] = useState(true);

  // const toggleSwitch = () => {
  //   if(!isEnabled) {
  //     setSelectRole('admin') 
  //   } else {
  //     setSelectRole('user')
  //   }

  //   setIsEnabled(previosState => !previosState)
  // }

  const simpleAlertHandler = () => {
    //function to make simple alert
    alert('¡Cuenta creada exitosamente!');
  };

  const AlertHandler = () => {
    //function to make simple alert
    alert('Porfavor ingresar contraseñas iguales.');
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        navigation.replace("Home")
      }
    })
    return unsubscribe;
  }, [])

  const handleSignUp = () => {
    if(password == valPassword && email !== '' && password !== ''){
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(authUser.user, {
          displayName: name,
          photoURL: photoURL || 
          "https://st4.depositphotos.com/4329009/19956/v/950/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
        })
      })
      .catch(error => alert(error.message))
    } else {
      AlertHandler();
    }
  }

  return (
    <View style={[registerStyles.container]}>
      <StatusBar backgroundColor={'#020202'} translucent={true}/>
      <View style={registerStyles.logo}>
        <Text style={{
          color: "#020202",
          fontSize: 25,
          fontWeight: 'bold',
          fontStyle: 'italic'
        }}>Crear Usuario</Text>
      </View>
      <Input 
        type='name' 
        placeholder='Nombre'
        value={name}
        onChangeText={text => setName(text)}
        />
      <Input 
        type='email' 
        placeholder='Correo'
        value={email}
        autoCapitalize='none'
        onChangeText={text => setEmail(text)}
        />
      <Input 
      type='password' 
      placeholder='Contraseña' 
      secureTextEntry={isSecureEntry}
      autoCapitalize='none'
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
      placeholder='Confirmar contraseña' 
      secureTextEntry={isSecureEntryConfirm}
      autoCapitalize='none'
      rightIcon=
      { <TouchableOpacity onPress={() => {
        setSecureEntryConfirm((prev) => !prev)
      }}>
          <Text>{isSecureEntryConfirm? <Feather name="eye" size={24} color="black" /> : <Feather name="eye-off" size={24} color="black" />}</Text>
        </TouchableOpacity>
      }
      value={valPassword}
      onChangeText={text => setValPassword(text)}
      />
      <Input 
        type='Url' 
        placeholder='URL foto de perfil (Opcional)'
        value={photoURL}
        onChangeText={text => setPhotoURL(text)}
        />
      {/* <View style={[registerStyles.switchContainer]}>
      <Text style={[registerStyles.switch]}>
        ¿Es usuario administrador? 
      </Text>
      <Switch
        trackColor={{false: '#767577', true: 'gray'}}
        thumbColor={isEnabled ? '#ea071d' : '#FAF9F6'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View> */}
      <TouchableOpacity
        onPress={handleSignUp}
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
          Crear Usuario
        </Text>
      </TouchableOpacity>
      <View style={[registerStyles.backToLogInContainer]}>
        <View>
          <Text>¿Ya cuentas con una cuenta?</Text>
        </View>
        <View style={[registerStyles.buttonContainer]}>
          <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          >
              <Text style={[registerStyles.backToLogInButtonText]}>Inicia Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}