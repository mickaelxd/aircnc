import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, Alert, ScrollView, Touchable, Text, AsyncStorage, TouchableOpacity, StyleSheet, Image } from 'react-native';

import logo from '../assets/logo.png';

import SpotList from '../components/SpotList';

export default function List({ navigation }){

    async function logout(){
        await AsyncStorage.removeItem('user');
        navigation.navigate('Login')
    }
    
    const [techs, setTechs ] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.16:3333', {
                query: { user_id }
            })
       
            socket.on('booking_response', booking => {
            Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'aprovada!' : 'rejeitada.'}`)
        })
    })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    return (
        
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={logout}>
                <Image  style={styles.logo} source={logo}/>
            </TouchableOpacity>
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
            </ScrollView>
        </SafeAreaView>


    )
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    logo:{
        alignSelf: "center",
        height: 32,
        resizeMode: "contain",
        marginTop: 50,
    },
    button:{
        marginTop: 20,
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 2,
    },
    buttonText:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    form:{
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

})