import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, StatusBar, Image } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router"
import { useAuth } from "@/app/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";

export function LoginView() {
    const router = useRouter();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth();

    const logIn = async () => {
        const email = user.trim();
        const pass = password.trim();
    
        if (!email || !pass) {
            Alert.alert("Error", "Campos vacíos");
            return;
        }
    
        console.log("Intentando iniciar sesión con:", email);
        const logInResponse = await login(email, password);
    
        if (logInResponse) {
            console.log("Inicio de sesión exitoso",);
            Alert.alert("Éxito", "Inicio de sesión exitoso");
            router.replace("/drawer/(bHome)");


        } else {
            Alert.alert("Error", "Credenciales incorrectas");
        }
    };

    return (
        <View>
            <StatusBar backgroundColor="white" barStyle="dark-content"/>
            <LinearGradient 
                colors={["#82c1f3", "#59abed", "#0057b7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.body}
            >
                <View style={styles.header}>
                    <Image
                        style={styles.image}
                        source={require("../../../assets/images/logo_sisdegua.png")}
                    />
                </View>
                <View style={styles.line}>
                    <Svg height="20" width="100%">
                        <Path 
                            d="M 0 10 Q 50 0, 100 10 T 200 10 T 300 10 T 400 10 T 500 10" 
                            stroke="#1267ab" 
                            strokeWidth="10" 
                            fill="transparent"
                        />
                    </Svg>
                </View>

                <View style={styles.box1}>
                    <Text style={styles.title}>Inicio de Sesión</Text>
                    <FontAwesome5 name="users" size={32} color="black" />
                </View>
                <View style={styles.box2}>
                    <View style={styles.box2_2}>
                    <TextInput
                        placeholder="Email"
                        style={styles.textInput1}
                        onChangeText={setUser}
                        value={user}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                        <TextInput
                            secureTextEntry={true}
                            placeholder="Contraseña"
                            style={styles.textInput2}
                            onChangeText={setPassword}
                            value={password}
                        />
                    </View>
                    <View style={styles.box2_3}>
                        <TouchableOpacity
                            style={styles.check}
                            onPress={logIn}
                        >
                            <Feather name="arrow-right" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.box4}>
                    <TouchableOpacity style={styles.btn_newUser}
                    onPress={() => router.push("/about/(eRegister)")}
                    >
                        <Text style={styles.text2}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        width:'100%',
        height: 'auto',
        alignItems: 'center',
    },
    image:{
        height: 140,
        width: 230,
        marginTop: -10,
        marginBottom: 60,
    },
    body: {
        backgroundColor: '#9fc5f8',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box1: {
        marginTop: 20,
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
    },
    box2: {
        marginTop: 40,
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput1: {
        width: 'auto',
        backgroundColor: '#ffffff',
        borderTopRightRadius: 40,
        height: 50,
        borderWidth: 0.2,
        padding: 15,
    },
    textInput2: {
        width: 'auto',
        backgroundColor: '#ffffff',
        borderBottomRightRadius: 40,
        height: 50,
        borderWidth: 0.2,
        padding: 15,
    },
    box2_2: {
        width: '75%',
        padding: 0,
    },
    box2_3: {
        width: 'auto',
        padding: 0,
        marginLeft: 20,
    },
    check: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 0,
        backgroundColor: '#674ea7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box4: {
        marginTop: 15,
        width: '100%',
        height: 'auto',
        alignItems: 'flex-start',
    },
    btn_newUser: {
        width: '30%',
        backgroundColor: '#f8c471',
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        height: 45,
        borderWidth: 0,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#c0392b'
    },
    line: {
        width: "100%",
        alignItems: "center",
        marginVertical: 15,
    },    
});