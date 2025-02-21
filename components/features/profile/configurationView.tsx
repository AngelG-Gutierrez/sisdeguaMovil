import { useAuth } from "@/app/context/AuthContext";
import { router } from "expo-router";
import { Text, TouchableOpacity, View, StatusBar, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function ConfigurationView(){

    const {logout} = useAuth();

    const handleLogout = async () => {
        await logout();
        router.replace("/about/(aLogin)");
    }

    
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
                    <Text>Nombre del usuario</Text>
                    <Text>Nombre del usuario</Text>
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