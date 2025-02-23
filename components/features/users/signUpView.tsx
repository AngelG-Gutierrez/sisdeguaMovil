import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, StatusBar } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from "expo-router"; 
import { UserService } from "./services/userService";
import { LinearGradient } from "expo-linear-gradient";

export function SignUpView() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSignUp = async () => {
        if (!name.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
            Alert.alert("Error", "Todos los campos son obligatorios.");
            return;
        }

        const userService = new UserService();
        const newUser = await userService.register({ email, password, name, lastname:lastName});

        if (newUser) {
            Alert.alert("Éxito", "Usuario registrado correctamente.");
            router.push("/about/(aLogin)");
        } else {
            Alert.alert("Error", "No se pudo registrar el usuario.");
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
                <View style={styles.box4}>
                    <Text style={styles.text}>¿Ya estás registrado?</Text>
                    <TouchableOpacity style={styles.btn_Login} onPress={() => router.push("/about/(aLogin)")}>
                        <Text style={styles.text2}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.box1}>
                    <FontAwesome5 name="users" size={45} color="black" />
                    <Text style={styles.title}>Regístrate</Text>
                </View>
                <View style={styles.box2}>
                    <View style={styles.box2_2}>
                        <TextInput
                            placeholder="Nombre"
                            style={styles.textInput1}
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            placeholder="Apellidos"
                            style={styles.textInput}
                            value={lastName}
                            onChangeText={setLastName}
                        />
                        <TextInput
                            placeholder="Correo"
                            style={styles.textInput}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            placeholder="Contraseña"
                            style={styles.textInput2}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <View style={styles.box2_3}>
                        <TouchableOpacity style={styles.check} 
                            onPress={handleSignUp}
                        >
                            <Text>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#9fc5f8',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box1: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    box2: {
        marginTop: 20,
        width: '100%',
        height: 'auto',
        alignItems: 'flex-start'
    },
    textInput: {
        width: 'auto',
        backgroundColor: '#ffffff',
        height: 50,
        borderWidth: 0.2,
        padding: 15,
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
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        padding: 0,
        marginLeft: 20,
    },
    check: {
        height: 50,
        width: 'auto',
        padding: 15,
        flexDirection: 'row',
        borderRadius: 25,
        borderWidth: 0,
        backgroundColor: '#674ea7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#666666',
        marginRight: 5,
        marginBottom: 10,
    },
    box4: {
        marginBottom: 25,
        width: '100%',
        height: 'auto',
        alignItems: 'flex-end',
    },
    btn_Login: {
        width: '33%',
        backgroundColor: '#f8c471',
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        height: 50,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#c0392b'
    },
});