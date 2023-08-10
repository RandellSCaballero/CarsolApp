import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text } from "react-native";
import CustomListItem from "../components/CustomListItem";
import { ChatsStyles } from "../styles/styles";
import { Avatar } from "react-native-elements";
import { SimpleLineIcons } from '@expo/vector-icons'
import { auth, firebase } from "../database/firebase";
import { StatusBar } from "expo-status-bar";

const AdminChats = ({ navigation }) => {
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
      )
    });
  },[navigation])

  useEffect(() => {
    allChats
    .onSnapshot(
      querySnapshot => {
        const chat = []
        querySnapshot.forEach((doc) => {
          const { chatName, userId } = doc.data()
          chat.push({
            userId: userId,
            id: doc.id,
            chatName: chatName,
          })
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

  return (
    <SafeAreaView style={ChatsStyles.container}>
      <StatusBar style='light'/>
      <ScrollView style={ChatsStyles.scrollViewContainer}>
          {chats.map(({id, chatName, userId}) => (
            <CustomListItem 
            key={id} 
            id={id} 
            chatName={chatName}
            enterChat={enterChat}
            />
          ))}
        <Text></Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminChats;