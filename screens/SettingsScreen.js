import React from 'react';
import { auth } from '../database/firebase';
import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity } from 'react-native';
import { SettingStyles } from '../styles/styles'
import { FontAwesome5 } from '@expo/vector-icons';

export default function Settings() {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
    .signOut()
    .then(() => {
      navigation.replace("Login")
    })
    .catch(error => alert(error.message))
  }
  const settingsOptions=[
    {title:"Editar mi Informacion", subTitle:"Edita el nombre completo de tu cuenta", onPress: ()=> navigation.navigate("ChangeInformation")},
    {title:"Editar Correo", subTitle:"Editar el correo de tu cuenta", onPress: () => navigation.navigate("ChangeEmail")},
    {title:"Editar Contraseña", subTitle:"Editar contraseña de tu cuenta", onPress: () => navigation.navigate("ChangePassword")},
  ]

  return (
    <View style={[SettingStyles.Container]}>
      <View>
        {/* {auth.currentUser?.photoURL || 
        } */}
        <FontAwesome5 name="user" size={100} color="#ea071d" />
      </View>
      <View>
        <Text style={[SettingStyles.textEmail]}>{auth.currentUser?.displayName || "Anonimo" }</Text>
      </View>
      <View style={[SettingStyles.topContainer]}>
        <View style={{height: 0.5, backgroundColor: "#808080"}}/>
        {settingsOptions.map(({title, subTitle, onPress}) => 
        <TouchableOpacity key={title} onPress={onPress}>
          <View style={[SettingStyles.itemsContainer]}>
            <Text style={[SettingStyles.itemTitle]}>
              {title}
            </Text>
            {subTitle && <Text style={[SettingStyles.itemSubTitle]}>{subTitle}</Text>}
          </View>
          <View style={{height: 0.5, backgroundColor: "#808080"}}/>
        </TouchableOpacity>)}
      </View>
      <View style={[SettingStyles.bottomContainer]}>
      <TouchableOpacity
        onPress={handleSignOut}
        style={{
          backgroundColor: "#ea071d",
          padding: 10,
          marginTop: "20%",
          width: "50%",
          alignSelf: "center",
          borderRadius: 10
        }}
      >
        <Text
          style={[SettingStyles.signOutButtonText]}
        >
          Sign Out
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}