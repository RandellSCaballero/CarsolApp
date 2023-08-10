import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Feather, AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { auth, firebase } from './database/firebase'

//Screens
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import RegisterScreen from './screens/RegisterScreen'
import Login from "./screens/LoginScreen";
import PasswordScreen from "./screens/PasswordScreen";
import ChatsScreen from "./screens/ChatsScreen";
import CompleteInfo from "./screens/CompleteInfoScreen";
import ChatScreen from "./screens/ChatScreen";
import AddChatScreen from "./screens/AddChatScreen"
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import ChangeEmailScreen from "./screens/ChangeEmailScreen";
import ChangeInformationScreen from "./screens/ChangeInformationScreen";
import ToDoScreen from "./screens/ToDoScreen";
import DetailToDoScreen from "./screens/DetailToDoScreen";
import AdminChats from "./screens/AdminChatsScreen";

const HomeStackNavigator = createNativeStackNavigator();
const allUsers = firebase.firestore().collection('users');
const globalScreenOptions = {
    headerTintColor: "#ffffff",
    headerStyle: { backgroundColor: "#ea071d" },
    headerTitleStyle: { color: "white" }
}


export default function Navigation(){
    
    return (
        <NavigationContainer>
            <HomeStackNavigator.Navigator>
                <HomeStackNavigator.Screen options={{ headerShown: false }} name="Login" component={Login}/>
                <HomeStackNavigator.Screen options={{ headerShown: false }} name="CompleteInfo" component={CompleteInfo}/>
                <HomeStackNavigator.Screen options={{ headerShown: false }} name="Home" component={MyTabs}/>
                <HomeStackNavigator.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen}/>
                <HomeStackNavigator.Screen options={{ headerShown: false }} name="Password" component={PasswordScreen}/>
                <HomeStackNavigator.Screen options={{ headerShown: false }} name="ChangePassword" component={ChangePasswordScreen}/>
                <HomeStackNavigator.Screen options={{ headerShown: false }} name="ChangeEmail" component={ChangeEmailScreen}/>
                <HomeStackNavigator.Screen options={{ headerShown: false }} name="ChangeInformation" component={ChangeInformationScreen}/>
                <HomeStackNavigator.Screen options={{ headerShown: true }} name="AddChat" component={AddChatScreen}/>
                <HomeStackNavigator.Screen options={{ headerShown: true }} name="Chat" component={ChatScreen}/>
                <HomeStackNavigator.Screen options={{ headerShown: true }} name="Detail" component={DetailToDoScreen}/>
            </HomeStackNavigator.Navigator>
        </NavigationContainer>
    );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    if(auth.currentUser?.uid === "PR4v8Nhi24bqfEps88oL17WCa233"){
        return(
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarActiveTintColor: '#ea071d',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: "#ea071d" },
                    headerTitleAlign: "center"
                }}
            >
                <Tab.Screen 
                name="Inicio" 
                component={HomeScreen}
                options={{
                    tabBarLabel: "Admin",
                    tabBarIcon: ({color, size}) => (
                        <Feather name="home" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
                />
                <Tab.Screen 
                name="Chats" 
                component={AdminChats}
                options={{
                    tabBarLabel: "Conversaciones",
                    tabBarIcon: ({color, size}) => (
                        <Entypo name="chat" size={size} color={color} />
                    ),
                    headerShown: true,
                }}
                />
                <Tab.Screen 
                name="ToDos" 
                component={ToDoScreen}
                options={{
                    tabBarLabel: "Pendientes",
                    tabBarIcon: ({color, size}) => (
                        <Entypo name="calendar" size={size} color={color} />
                    ),
                    headerShown: true,
                }}
                />
                <Tab.Screen 
                name="Settings" 
                component={SettingsScreen}
                options={{
                    tabBarLabel: "Configuración",
                    tabBarIcon: ({color, size}) => (
                        <AntDesign name="setting" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
                />
            </Tab.Navigator>
            )    
        } else {
        return(
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarActiveTintColor: '#ea071d',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: "#ea071d" },
                    headerTitleAlign: "center"
                }}
            >
                <Tab.Screen 
                name="Inicio" 
                component={HomeScreen}
                options={{
                    tabBarLabel: "Inicio",
                    tabBarIcon: ({color, size}) => (
                        <Feather name="home" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
                />
                <Tab.Screen 
                name="Chats" 
                component={ChatsScreen}
                options={{
                    tabBarLabel: "Conversaciones",
                    tabBarIcon: ({color, size}) => (
                        <Entypo name="chat" size={size} color={color} />
                    ),
                    headerShown: true,
                }}
                />
                <Tab.Screen 
                name="Settings" 
                component={SettingsScreen}
                options={{
                    tabBarLabel: "Configuración",
                    tabBarIcon: ({color, size}) => (
                        <AntDesign name="setting" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
                />
            </Tab.Navigator>
            )
        }
}