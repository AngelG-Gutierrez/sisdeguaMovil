import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import { DataSource } from "./dataSource";
import { User } from "./user";

export function LoginView(){

    const dataSource = new DataSource();
    const[user,setUser] = useState("");
    const[password,setPassword] = useState("")
    const logIn = async (user:User) =>{
        if(!user.email.trim() || !user.password.trim()){
            Alert.alert("Error", "campos vacios")
        }
        const logIn = await dataSource.loginUser(user.email,user.password);

        if (logIn) {
            console.log("Inicio de sesión exitoso", logIn);
        } else {
            Alert.alert("Error", "Credenciales incorrectas");
        }
    }

    return(
        <View style={styles.body}>
            <View style={styles.box1}>
                <FontAwesome5 name="users" size={45} color="black" />
                <Text style={styles.title}>Inicio de Sesión</Text>
            </View>
            <View style={styles.box2}>
                <View style={styles.box2_2}>
                    <TextInput
                        placeholder="Email"
                        style={styles.textInput1}
                        onChangeText={setUser}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Contraseña"
                        style={styles.textInput2}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.box2_3}>
                    <TouchableOpacity style={styles.check}
                    onPress={()=>logIn}
                    >
                        <Feather name="arrow-right" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.box4}>
                <TouchableOpacity style={styles.btn_newUser}>
                    <Text style={styles.text2}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: '#9fc5f8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box1:{
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
    },
    box2:{
        marginTop: 40,
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput1:{
        width: 'auto',
        backgroundColor: '#ffffff',
        borderTopRightRadius: 40,
        height: 50,
        borderWidth: 1,
        padding: 15,
    },
    textInput2:{
        width: 'auto',
        backgroundColor: '#ffffff',
        borderBottomRightRadius: 40,
        height: 50,
        borderWidth: 1,
        padding: 15,
    },
    box2_2:{
        width: '75%',
        padding: 0,
    },
    box2_3:{
        width: 'auto',
        padding: 0,
        marginLeft: 20,
    },
    check:{
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#674ea7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box3:{
        marginTop: 15,
        width: '100%',
        height: 'auto',
        alignItems: 'flex-end',
        paddingRight: '10%',
    },
    text:{
        color: '#666666',
    },
    box4:{
        marginTop: 15,
        width: '100%',
        height: 'auto',
        alignItems: 'flex-start',
    },
    btn_newUser:{
        width: '30%',
        backgroundColor: '#f8c471',
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        height: 50,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text2:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#c0392b'
    },
});