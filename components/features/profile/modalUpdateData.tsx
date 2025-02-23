import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";

interface ModalUpdateDataProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

export default function ModalUpdateData({ modalVisible, setModalVisible }: ModalUpdateDataProps) {
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
                                <TextInput style={styles.input} placeholder="Ingresa tu nombre" />

                                <Text style={styles.text}>Apellidos</Text>
                                <TextInput style={styles.input} placeholder="Ingresa tus apellidos" />

                                <Text style={styles.text}>Email</Text>
                                <TextInput style={styles.input} placeholder="Correo electrónico" keyboardType="email-address" />
                            </View>
                            <View style={styles.box_btn}>
                                <TouchableOpacity style={styles.btn_update}>
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
