import { StyleSheet } from 'react-native'

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '30%',
        backgroundColor: '#ffffff'
    },
    logo: {
        alignItems: 'center'
    },
    navigationText: {
        fontSize: 15,
        textAlign: "center",
        color: "#ea071d",
        fontWeight: 'bold'
    }
})

export const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    map: {
        height: '100%',
        width: '100%'
    },
})

export const ChatsStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F6'
    },
    scrollViewContainer: {
        height: "100%"
    }
})

export const ToDosStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F6'
    },
    scrollViewContainer: {
        height: "50%",
        borderColor: '#ea071d',
        borderWidth: 2
    }
})

export const HistoryStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FAF9F6',
        paddingTop: "5%",
        paddingBottom: '5%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 2
    },
    historyIcon: {
        margin: 5,
        fontSize: 24,
        marginLeft: 14
      },
    text: {
        fontWeight: '600',
        fontSize: 13
    },
    date: {
        fontWeight: '500',
        fontSize: 12,
        paddingRight: 3
    }
})

export const SettingStyles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAF9F6',
        paddingTop: "5%",
    },
    topContainer: {
        height: "45%",
        width: '100%',
        paddingTop: '12%',
    },
    text: {
        paddingLeft: '5%'
    },
    textEmail: {
        fontSize: 20,
        color: '#020202',
        fontWeight: 'bold'
    },
    itemsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 20,
    },
    itemTitle: {
        fontSize: 17,
    },
    itemSubTitle: {
        fontSize: 14,
        opacity: 0.7,
        paddingTop: 5
    },
    bottomContainer: {
        height: "20%",
        width: '100%',
        paddingTop: 10,
    },
    signOutButtonText: {
            fontSize: 15,
            textAlign: "center",
            color: "#FAF9F6"
    }
})

export const registerStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '5%',
        paddingTop: '30%'
    },
    logo: {
        paddingTop: 20,
        alignItems: 'center'
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems:'center',  
    },
    switch: {
        paddingRight: 10,
        fontWeight: '600',
        fontSize: 15,
    },
    backToLogInContainer: {
        flexDirection: 'row',
        paddingTop: 20
    },
    buttonContainer: {
        paddingLeft: 3
    },
    backToLogInButtonText: {
        fontWeight: 'bold',
        color: '#ea071d'
    }
})

export const forgotPasswordStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        width: '95%',
        height: '30%',
        paddingTop: '10%'
    },
    text: {
        textAlign:'center',
        fontSize: 20,
        fontWeight: 500
    },
    subText: {
        textAlign:'center',
        fontSize: 17,
        fontWeight: 400
    },
    textInputContainer: {
        flexDirection: 'row',
    },
    forgotContainer: {
        flexDirection: 'row',
    },
    touchableItem: {
        padding: 10
    }
})