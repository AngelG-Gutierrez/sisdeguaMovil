import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';

export function SignUpView(){
    return(
        <View style={styles.body}>
            <View style={styles.box4}>
                <Text style={styles.text}>¿Ya estas registrado?</Text>
                <TouchableOpacity style={styles.btn_Login}>
                    <Text style={styles.text2}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.box1}>
                <FontAwesome5 name="users" size={45} color="black" />
                <Text style={styles.title}>Registrate</Text>
            </View>
            <View style={styles.box2}>
                <View style={styles.box2_2}>
                    <TextInput
                        placeholder="Nombre"
                        style={styles.textInput1}
                    />
                    <TextInput
                        placeholder="Apellidos"
                        style={styles.textInput}
                    />
                    <TextInput
                        placeholder="Correo"
                        style={styles.textInput}
                    />
                    <TextInput
                        placeholder="Contraseña"
                        style={styles.textInput2}
                    />
                </View>
                <View style={styles.box2_3}>
                    <TouchableOpacity style={styles.check}>
                        <Text>Registrarse  </Text>
                        <AntDesign name="checkcircle" size={25} color="black" />
                    </TouchableOpacity>
                </View>
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
        marginTop: 20,
        width: '100%',
        height: 'auto',
        alignItems: 'flex-start'
    },
    textInput:{
        width: 'auto',
        backgroundColor: '#ffffff',
        height: 50,
        borderWidth: 1,
        padding: 15,
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
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        padding: 0,
        marginLeft: 20,
    },
    check:{
        height: 50,
        width: 'auto',
        padding: 10,
        flexDirection: 'row',
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#674ea7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color: '#666666',
        marginRight: 5,
        marginBottom: 10,
    },
    box4:{
        marginBottom: 25,
        width: '100%',
        height: 'auto',
        alignItems: 'flex-end',
    },
    btn_Login:{
        width: '33%',
        backgroundColor: '#f8c471',
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
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