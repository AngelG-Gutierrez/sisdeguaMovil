import { useAuth } from "@/app/context/AuthContext";
import { router } from "expo-router";
import { Text, TouchableOpacity, View, StatusBar, StyleSheet, ScrollView, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ProfileService } from "./services/profileService";
import { useEffect, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import ModalUpdateData from "./modalUpdateData";
import { User } from "../users/user";

export function ConfigurationView(){
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const {logout} = useAuth();
    const userService = new ProfileService();
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogout = async () => {
        await logout();
        router.replace("/about/(aLogin)");
    }

    useEffect(() => {
        const fetchData = async () => {
            const userData = await userService.currentUser();
            if (userData) {
                setUserName(userData.name);
                setUserLastName(userData.lastname);
                setUserEmail(userData.email);
            }
        };
        fetchData();
    }, []);

    return(
        <View>
            <StatusBar backgroundColor="white" barStyle="dark-content"/>
            <LinearGradient 
                colors={["#9fc5f8", "#0057b7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.body}
            >
                <View style={styles.header}>
                    <TouchableOpacity 
                    onPress={handleLogout}
                    style={styles.btn_exit}>
                        <Text>Cerrar Sesión</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.scroll}>
                    <View style={styles.box_infoUser}>
                        <Text style={styles.text_name}>{userName} {userLastName}</Text>
                        <Text style={styles.text_email}>{userEmail}</Text>
                    </View>
                    <View style={styles.box1}>
                        <Text style={styles.text}>Bienvenido a tu perfil. Aquí puedes ver y actualizar tu información. Asegúrate de mantener tus datos actualizados para una mejor experiencia.</Text>
                    </View>
                    <View style={styles.box2}>
                        <View style={styles.box2_2}>
                            <Text style={styles.title1}>¡Importante!</Text>
                            <Text style={styles.text}>Procura no compartir tus datos personales, se puede hacer uso inapropiado de su información.</Text>
                        </View>
                        <View style={styles.box2_3}>
                            <Text style={styles.title1}>¿Deseas actualizar tus datos?</Text>
                            <Text style={styles.text2}>Da clic en el siguiente botón</Text>
                            <AntDesign name="arrowdown" size={20} color="black" />
                            <TouchableOpacity style={styles.btn_update}
                            onPress={() => setModalVisible(true)}
                            >
                                <Text style={styles.text_btn}>Actualizar datos</Text>
                            </TouchableOpacity>
                            <Text style={styles.text2}>Posteriormente sigue las indicaciones.</Text>
                        </View>
                    </View>
                    <View style={styles.box3}>
                        <View style={styles.box3_1}>
                            <Text style={styles.title1}>Información de Seguridad</Text>
                        </View>
                            <Text style={styles.title1}>Cambio de contraseña</Text>
                            <Text style={styles.text}>Si desea hacer un cambio de contraseña, de clic en el siguiente botón y siga las indicaciónes.</Text>
                            <View style={styles.box3_1}>
                                <TouchableOpacity style={styles.btn_update}
                                    onPress={() => Alert.alert("Próximamente")}
                                >
                                    <Text style={styles.text_btn}>Cambiar contraseña</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                </ScrollView>
            </LinearGradient>
            <ModalUpdateData 
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        backgroundColor: '#9fc5f8',
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    header:{
        width: '100%',
        alignItems: 'flex-end',
    },
    btn_exit:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8c471',
        height: 40,
        width: 110,
        borderColor: '#000000',
        borderBottomLeftRadius: 10,
    },
    box_btn:{
        width: '100%',
        height: 'auto',
        alignItems: 'flex-end',
        marginRight: -35,
    },
    scroll:{
        padding: 10,
    },
    btn_out:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: 95,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: '#ffffff',
    },
    box_infoUser:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    text_name:{
        fontSize: 30,
        fontWeight: 900,
        textAlign: 'center',
    },
    text_email:{
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center',
    },
    box1:{
        padding: 15,
        marginTop: 30,
        width: '100%',
        height: 160,
        borderWidth: 0.5,
        borderColor: '#000000',
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    box2:{
        flexDirection: 'row',
        gap: 10,
    },
    box2_2:{
        padding: 15,
        marginTop: 10,
        width: '42%',
        height: 300,
        borderWidth: 0.5,
        borderColor: '#000000',
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    box2_3:{
        alignItems: 'center',
        padding: 15,
        marginTop: 10,
        width: '54%',
        height: 300,
        borderWidth: 0.5,
        borderColor: '#000000',
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    text:{
        fontSize: 14,
        lineHeight: 30,
    },
    text2:{
        fontSize: 14,
        lineHeight: 30,
        textAlign: 'center',
    },
    title1:{
        fontWeight: 'bold',
        fontSize: 17,
        marginBottom: 5,
    },
    btn_update:{
        backgroundColor: '#674ea7',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        width: 161,
        alignItems: 'center',
    },
    text_btn:{
        color: '#ffffff',
    },
    box3:{
        padding: 14,
        marginTop: 10,
        width: '100%',
        height: 210,
        borderWidth: 0.5,
        borderColor: '#000000',
        borderRadius: 15,
        marginBottom: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    box3_1:{
        width: '100%',
        alignItems: 'center',
    },
    box3_info:{
        width: '100%',
    },
})