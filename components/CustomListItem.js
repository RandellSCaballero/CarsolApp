import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { database } from "../database/firebase";
//import moment from "moment/moment";

const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = database
        .collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot) => 
            setChatMessages(snapshot.docs.map((doc) => doc.data()))
        );
        return unsubscribe
    })

    return(
        <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider >
            <Avatar
            rounded
            source={{
                uri: chatMessages?.[0]?.photoURL ||
                "https://st4.depositphotos.com/4329009/19956/v/950/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
            }}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: '800'}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.displayName}{": "}{chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({
    time: {
        fontSize: 12,
        color: '#777',
        alignSelf: 'flex-end'
    }
})