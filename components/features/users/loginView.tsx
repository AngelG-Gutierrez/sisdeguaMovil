import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { IconSymbol } from "@/components/ui/IconSymbol";

export function LoginView(){
    return(
        <View style={styles.body}>
            <View style={styles.box1}>
                <FontAwesome5 name="users" size={45} color="black" />
                <Text style={styles.title}>Inicio de Sesión</Text>
            </View>
            <View style={styles.box2}>
                <View style={styles.box2_2}>
                    <TextInput
                        placeholder="   Usuario"
                        style={styles.textInput1}
                    />
                    <TextInput
                        placeholder="   Contraseña"
                        style={styles.textInput2}
                    />
                </View>
                <View style={styles.box2_3}>

                </View>
            </View>
            <View></View>
            <View></View>
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
    },
    textInput1:{
        width: '75%',
        backgroundColor: '#ffffff',
        borderTopRightRadius: 40,
        height: 50,
        padding: 10,
        borderWidth: 1,
    },
    textInput2:{
        width: '75%',
        backgroundColor: '#ffffff',
        borderBottomRightRadius: 40,
        height: 50,
        padding: 10,
        borderWidth: 1,
    },
    box2_2:{
        width: '50%',
    },
});