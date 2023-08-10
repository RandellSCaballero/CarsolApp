import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text } from "react-native";
import CustomListItem from "../components/CustomListItem";
import { ChatsStyles } from "../styles/styles";
import { Avatar } from "react-native-elements";
import { SimpleLineIcons } from '@expo/vector-icons'
import { auth, firebase } from "../database/firebase";
import { StatusBar } from "expo-status-bar";

const Chats = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const allChats = firebase.firestore().collection('chats');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Carsol",
      headerStyle: { backgroundColor: "#ea071d" },
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }}/>
        </View>
      ),
      headerRight: () => (
        <View style={{
          flexDirection:"row",
          justifyContent:"flex-end",
          width: 80,
          marginRight: 20,
        }}>
          <TouchableOpacity 
          onPress={() => navigation.navigate("AddChat")}
          activeOpacity={0.5}>
            <SimpleLineIcons name="pencil" size={24} color="#ffffff"/>
          </TouchableOpacity>
        </View>
      )
    });
  },[navigation])

  useEffect(() => {
    allChats
    .onSnapshot(
      querySnapshot => {
        const chat = []
        querySnapshot.forEach((doc) => {
          const { chatName, userId } = doc.data(userId)
          if(userId === auth.currentUser.uid){
            chat.push({
              userId: userId,
              id: doc.id,
              chatName: chatName,
            })
          }
        })
        setChats(chat)
      }
    )
  }, [])

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id,
      chatName,
    });
  }
  if(chats.length !== 0 && auth.currentUser.uid !== 'PR4v8Nhi24bqfEps88oL17WCa233'){
    return (
      <SafeAreaView style={ChatsStyles.container}>
        <StatusBar style='light'/>
        <ScrollView style={ChatsStyles.scrollViewContainer}>
            {chats.map(({id, chatName}) => (
              <CustomListItem 
              key={id} 
              id={id} 
              chatName={chatName}
              enterChat={enterChat}
              />
            ))}
        </ScrollView>
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'}}>
        <StatusBar style='light'/>
          <Text>¡No tienes conversaciones activas actualmente!</Text>
          <TouchableOpacity
        onPress={() => navigation.navigate("AddChat")}
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
          Crear Conversacion
        </Text>
      </TouchableOpacity>
      </SafeAreaView>
    );
  }
};

export default Chats;