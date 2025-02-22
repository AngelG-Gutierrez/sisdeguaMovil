import { useAuth } from "@/app/context/AuthContext";
import { router } from "expo-router";
import { Text, TouchableOpacity, View, StatusBar, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ProfileService } from "./services/profileService";
import { useEffect, useState } from "react";

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
                <TouchableOpacity 
                onPress={handleLogout}>
                    <Text>Cerrar Sesión</Text>
                </TouchableOpacity>
                <View>
                    <Text>{userName} {userLastName}</Text>
                    <Text>{userEmail}</Text>
                </View>
                <View></View>
                <View></View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        backgroundColor: '#9fc5f8',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})