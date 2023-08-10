import React, { useState } from 'react';
import {Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginStyles, forgotPasswordStyles } from '../styles/styles';
import { Input } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../database/firebase';

const PasswordScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const resetPassword = () => {
        if(email!=null) {
            sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Link para resetear tu contraseña ha sido enviado');
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
            })
        }
    }

  return (
    <View style={[forgotPasswordStyles.container]}>
        <FontAwesome5 name="user" size={100} color="#ea071d" />
        <View style={[forgotPasswordStyles.textContainer]}>
            <Text style={[forgotPasswordStyles.text]}>Indicanos tu correo asociado con tu cuenta.</Text>
            <Text style={[forgotPasswordStyles.subText]}>Te enviaremos un codigo de verificacion para reiniciar tu contraseña.</Text>
        </View>
        <View style={[forgotPasswordStyles.textInputContainer]}>
            <Input 
            type='email' 
            placeholder='Correo'
            value={email}
            onChangeText={text => setEmail(text)}
            />
        </View>
        <View
        style={[forgotPasswordStyles.forgotContainer]}>
            <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={[forgotPasswordStyles.touchableItem]}
            >
                <Text style={[loginStyles.navigationText]}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={resetPassword}
            style={[forgotPasswordStyles.touchableItem]}
            >
                <Text style={[loginStyles.navigationText]}>Enviar</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default PasswordScreen;