import { useAuth } from "@/app/context/AuthContext";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";


export function ConfigurationView(){

    const {logout} = useAuth();

    const handleLogout = async () => {
        await logout();
        router.replace("/about/(aLogin)");
    }

    
    return(
        <View>
            <Text>Aqui estara la configuración</Text>
            <TouchableOpacity 
            onPress={handleLogout}>
                <Text>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    )
}