import { useAuth } from "@/app/context/AuthContext";
import { router } from "expo-router";
import { Text, TouchableOpacity, View, StatusBar, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
<<<<<<< Updated upstream
import { ProfileService } from "./services/profileService";
import { useEffect, useState } from "react";
=======
import Feather from '@expo/vector-icons/Feather';
import { ScrollView } from "react-native-gesture-handler";
>>>>>>> Stashed changes

export function ConfigurationView(){
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const {logout} = useAuth();
    const userService = new ProfileService();

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
<<<<<<< Updated upstream
                <TouchableOpacity 
                onPress={handleLogout}>
                    <Text>Cerrar Sesión</Text>
                </TouchableOpacity>
                <View>
                    <Text>{userName} {userLastName}</Text>
                    <Text>{userEmail}</Text>
=======
                <View style={styles.box_btn}>
                    <TouchableOpacity 
                    onPress={handleLogout}
                    style={styles.btn_out}>
                        <Feather name="log-out" size={17} color="black" />
                        <Text style={styles.text_btn}> Cerrar Sesión</Text>
                    </TouchableOpacity>
>>>>>>> Stashed changes
                </View>
                <ScrollView>
                    <View style={styles.box_infoUser}>
                        <Text style={styles.text_name}>Alejandro Hernandez Hernandez</Text>
                        <Text style={styles.text_email}>alehernandez028h@gmail.com</Text>
                    </View>
                    <View style={styles.box1}>
                        <Text style={styles.text}>Recuerda no compartir tu información, es exclusiva y puede haber ciertos conflicos si es compartida. {"\n\n"}Procure hacer un uso adecuado de sus datos.</Text>
                    </View>
                    <View style={styles.box2}>
                        <View style={styles.box2_2}>

                        </View>
                        <View style={styles.box2_2}>

                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        backgroundColor: '#9fc5f8',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        padding: 15,
    },
    box_btn:{
        width: '100%',
        height: 'auto',
        alignItems: 'flex-end',
        marginRight: -35,
    },
    text_btn:{
        fontSize: 11,
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
        marginTop: 50,
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
        height: 140,
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
        marginTop: 10,
        width: '48%',
        height: 270,
        borderWidth: 0.5,
        borderColor: '#000000',
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    text:{
        fontSize: 14,
    },
})