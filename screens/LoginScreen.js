import React, { useEffect, useState } from 'react';
import { auth } from '../database/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Text, TouchableOpacity, View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { Image, Input } from 'react-native-elements';
import { loginStyles } from '../styles/styles'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSecureEntry, setSecureEntry] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        navigation.replace("Home")
      }
    })
    return unsubscribe;
  }, [])

  const handleLogin = () => {
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then()
        .catch((err) => alert('Error al iniciar sesion, revisar las credenciales', err.message));
    }
  }

  return (
      <KeyboardAvoidingView behavior='padding' style={[loginStyles.container]}>
      <StatusBar backgroundColor={'#ea071d'} translucent={true}/>
      <View style={loginStyles.logo}>
        <Image source={require('../images/CarsolLogo.jpg')}
        style={{
          height:250,
          width:250
        }}
        />
      </View>
      <Input 
        type='email' 
        placeholder='Usuario'
        value={email}
        autoCapitalize='none'
        onChangeText={text => setEmail(text)}
        />
      <Input 
      type='password' 
      placeholder='Contraseña' 
      value={password}
      autoCapitalize='none'
      secureTextEntry={isSecureEntry}
      rightIcon=
      { <TouchableOpacity onPress={() => {
        setSecureEntry((prev) => !prev)
      }}>
          <Text>{isSecureEntry? <Feather name="eye" size={24} color="black" /> : <Feather name="eye-off" size={24} color="black" />}</Text>
        </TouchableOpacity>
      }
      onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity
        onPress={handleLogin}
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
          Iniciar Sesión
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={{
          backgroundColor: "#ffffff",
          padding: 10,
          marginTop: "5%",
          width: "50%",
          alignSelf: "center",
          borderRadius: 20
        }}
      >
        <Text
          style={[loginStyles.navigationText]}
        >
          Registrarse
        </Text>
      </TouchableOpacity>
      <View style={[]}>
        <View style={[]}>
          <TouchableOpacity
          onPress={() => navigation.navigate("Password")}
          >
              <Text style={[loginStyles.navigationText]}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAvoidingView>
  );
}