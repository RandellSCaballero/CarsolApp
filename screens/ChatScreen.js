import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { useLayoutEffect } from 'react'
import { Avatar } from 'react-native-elements'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import { database, auth, firebase } from '../database/firebase'

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerTitleAlign: "left",
            headerTintColor: "#ffffff",
            headerStyle: { backgroundColor: "#ea071d" },
            headerTitle: () => (
                <View style={{
                    flexDirection:'row',
                    alignItems: 'center'
                }}>
                    <Avatar rounded source={{ 
                        uri: messages[0]?.data.photoURL ||
                        "https://st4.depositphotos.com/4329009/19956/v/950/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg" }} />
                    <Text
                    style={{
                        color: "white",
                        marginLeft: 10,
                        fontWeight: "700"
                    }}
                    >{route.params.chatName}</Text>
                </View>
            )
        })
    }, [navigation, messages])

    const sendMessage = () => {
        Keyboard.dismiss();
        database.collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        }) 
        setInput('');
    }

    useLayoutEffect(() => {
        const unsubscribe = database
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ));
        return unsubscribe;
    }, [route])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAF9F6" }}>
        <StatusBar style='light'/>
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height" || Platform.OS === "android" ? "padding" : "height" }
            style={styles.container}
            keyboardVerticalOffset={
                Platform.select({
                    ios: () => 90,
                    android: () => -200
                })()
            }
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                <ScrollView contentContainerStyle={{
                    paddingTop: 15,
                    
                }}>
                    {messages.map(({id, data}) => 
                        data.email === auth.currentUser.email ? (
                            <View key={id} style={styles.receiver}>
                                <Avatar 
                                position="absolute"
                                rounded
                                //Para WEB
                                containerStyle={{
                                    position: 'absolute',
                                    bottom: -15,
                                    right: -5,
                                }}
                                bottom={-15}
                                right={-5}
                                size={30}
                                    source={{
                                        uri: data.photoURL,

                                    }}
                                />
                                <Text style={styles.receiverText}>{data.message}</Text>
                            </View>
                        ) : (
                            <View key={id} style={styles.sender}>
                                <Avatar 
                                    position="absolute"
                                    rounded
                                    //Para WEB
                                    containerStyle={{
                                        position: 'absolute',
                                        bottom: -15,
                                        left: -5,
                                    }}
                                    bottom={-15}
                                    left={-5}
                                    size={30}
                                        source={{
                                            uri: data.photoURL,
    
                                        }}
                                />
                                <Text style={styles.senderText}>{data.message}</Text>
                                <Text style={styles.senderName}>{data.displayName}</Text>
                            </View>
                        )
                    )}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    onSubmitEditing={sendMessage}
                    placeholder='Carsol Mensaje' 
                    style={styles.textInput}
                    />
                    <TouchableOpacity 
                    onPress={sendMessage} 
                    activeOpacity={0.5}
                    >
                        <Ionicons name="send" size={24} color="#ea071d" />
                    </TouchableOpacity>
                </View>
                </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    footer: {
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",
        padding: 15,
    },
    receiver: {
        padding: 15,
        backgroundColor: "#c08080",
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: 'relative'
    },
    sender: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: 'relative'
    },
    senderText: {
        color: 'black',
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 15,
    },
    senderTimer: {
        fontSize: 9,
        color: 'black',
        alignSelf: 'flex-start'
    },
    receiverTimer: {
        fontSize: 9,
        fontWeight: '500',
        color: 'white',
        alignSelf: 'flex-start',
        marginTop: "5%"
    },
    receiverText: {
        color: 'white',
        fontWeight: '500',
        marginLeft: 10,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'black'
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ffffff",
        borderWidth: 1,
        padding: 10,
        color: "grey",
        borderRadius: 30,
    }
})