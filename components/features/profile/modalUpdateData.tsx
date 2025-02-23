import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";
import { ProfileService } from "./services/profileService";
import { useEffect, useState } from "react";

interface ModalUpdateDataProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

export default function ModalUpdateData({ modalVisible, setModalVisible }: ModalUpdateDataProps) {

    const[name, setName] = useState("");
    const[lastName, setLastName] = useState("");
    const[email, setEmail] = useState("");

    const profileService = new ProfileService();

    useEffect(() => {
        const fetchUserData = async () => {
            const profileData = await profileService.currentUser();
            if (profileData) {
                setName(profileData.name || "");
                setLastName(profileData.lastname || "");
                setEmail(profileData.email || "");
            }
        };

        if (modalVisible) {
            fetchUserData();
        }
    }, [modalVisible]);

    const handleUpdate = async () => {
        if (!name.trim() || !lastName.trim() || !email.trim()) {
            Alert.alert("Error", "Todos los campos son obligatorios.");
            return;
        }
        const updateUser = await profileService.editProfile({
            newEmail: email,
            newName: name,
            newLastName: lastName
        });
    
        if (updateUser) {
            Alert.alert("Perfil actualizado", "Tus datos se han actualizado correctamente.", [
                {
                    text: "OK",
                    onPress: () => {
                        setModalVisible(false);
                    },
                },
            ]);
        } else {
            Alert.alert("Error", "El usuario no se pudo actualizar");
        }
    };

    return (
        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
        >
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={styles.body}
            >
                <View style={styles.container}>
                    <LinearGradient 
                        colors={["#9fc5f8", "#0057b7"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.linear}
                    >
                        <View style={styles.btn_exit}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <AntDesign name="closecircle" size={25} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>Actualizar Datos</Text>
                        <ScrollView style={styles.scroll}>
                        <View style={styles.form}>
                                <Text style={styles.text}>Nombre</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ingresa tu nombre"
                                    value={name}
                                    onChangeText={setName}
                                />

                                <Text style={styles.text}>Apellidos</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ingresa tus apellidos"
                                    value={lastName}
                                    onChangeText={setLastName}
                                />

                                <Text style={styles.text}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Correo electrónico"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>
                            <View style={styles.box_btn}>
                                <TouchableOpacity style={styles.btn_update}
                                onPress={handleUpdate}
                                >
                                        <Text style={styles.text_btn}>Actualizar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </LinearGradient>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    container: {
        borderRadius: 15,
        backgroundColor: '#9fc5f8',
        width: '80%',
        height: '60%',
    },
    linear:{
        height: '100%',
        width: '100%',
        borderRadius: 15,
        alignItems: "center",
        padding: 20,
    },
    btn_exit:{
        width: '100%',
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    scroll: {
        width: "100%",
    },
    form:{
        width: '100%',
        marginTop: 15,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: "100%",
        height: 45,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 14,
        marginBottom: 15,
    },
    btn_update:{
        backgroundColor: '#674ea7',
        paddingVertical: 12,
        paddingHorizontal: 25,
        marginTop: 10,
        width: '50%',
        borderRadius: 10,
        alignItems: 'center'
    },
    box_btn:{
        width: '100%',
        alignItems: 'center',
    },
    text_btn:{
        color: '#ffffff',
        fontSize: 16,
        fontWeight: "bold",
    }
});
