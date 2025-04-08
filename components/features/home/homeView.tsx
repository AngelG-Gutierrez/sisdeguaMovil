import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, Button, Alert } from "react-native";
import { ProbabilityInfo } from "../probability/probabilityInfo";
import { GraphicsCurrent } from "../graphics/graphicCurrent";
import LottieView from 'lottie-react-native';
import { LinearGradient } from "expo-linear-gradient";
import { ProbabilityService } from "../probability/services/probabilityService";
import * as Notifications from "expo-notifications";

export function HomeView() {
    const [permisoOtorgado, setPermisoOtorgado] = useState(false);
    const [comprobandoPermiso, setComprobandoPermiso] = useState(true);
    const [levelRain, setLevelRain] = useState("");
    const [waterProbability, setWaterProbability] = useState("");
    const probabilityService = new ProbabilityService();

    useEffect(() => {
        const verificarPermiso = async () => {
            const { status: estadoActual } = await Notifications.getPermissionsAsync();
            if (estadoActual === "granted") {
                setPermisoOtorgado(true);
            }
            setComprobandoPermiso(false);
        };

        verificarPermiso();
    }, []);

    const solicitarPermisos = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === "granted") {
            setPermisoOtorgado(true);
            Alert.alert("¡Permiso otorgado!", "Gracias por activar las notificaciones.");
        } else {
            Alert.alert("Permiso no otorgado", "No podrás recibir notificaciones push.");
        }
    };

    useEffect(() => {
        if (!permisoOtorgado) return;

        const fetchData = async () => {
            try {
                const dataReal = await probabilityService.getFormattedDataReal();
                if (dataReal.length > 0) {
                    setLevelRain(dataReal[0]?.rainIntensity);
                    setWaterProbability(dataReal[0]?.waterProbability);
                }
            } catch (error) {
                console.error("Error obteniendo los datos:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 3000);
        return () => clearInterval(interval);
    }, [permisoOtorgado]);

    const getColorRain = () => {
        switch (levelRain) {
            case "Alta":
                return styles.high;
            case "Media":
                return styles.medium;
            case "Baja":
                return styles.low;
            default:
                return styles.nothing;
        }
    };

    const getColorWater = () => {
        switch (waterProbability) {
            case "Alta":
                return styles.high;
            case "Media":
                return styles.medium;
            case "Baja":
                return styles.low;
            default:
                return {};
        }
    };

    if (comprobandoPermiso) {
        return (
            <View style={styles.containerPermisos}>
                <Text style={styles.textPermiso}>Comprobando permisos...</Text>
            </View>
        );
    }

    if (!permisoOtorgado) {
        return (
            <View style={styles.containerPermisos}>
                <Text style={styles.textPermiso}>Para continuar, permite recibir notificaciones</Text>
                <Button title="Permitir Notificaciones" onPress={solicitarPermisos} />
            </View>
        );
    }

    return (
        <View>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <LinearGradient
                colors={["#0057b7", "#9fc5f8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.body}
            >
                <ScrollView>
                    <View style={styles.box_Header}>
                        <View style={styles.box1_Header}>
                            <LottieView
                                source={require('../../../assets/lotties/sun.json')}
                                loop
                                autoPlay
                                style={styles.image_sun}
                            />
                        </View>
                        <View style={styles.box2_Header}>
                            <Text style={styles.text1_Header}>Probabilidad de Desbordamientos</Text>
                            <Text style={[getColorWater()]}>{waterProbability}</Text>
                            <Text style={styles.text1_Header}>Intensidad de Lluvia</Text>
                            <Text style={[getColorRain()]}>{levelRain}</Text>
                        </View>
                    </View>

                    <View style={styles.container_Info}>
                        <ProbabilityInfo />
                    </View>
                    <View style={styles.container_graphic}>
                        <GraphicsCurrent />
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    containerPermisos: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    textPermiso: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
    },
    body: {
        backgroundColor: '#9fc5f8',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box_Header: {
        flexDirection: 'row',
        padding: 15,
        paddingLeft: 0,
        paddingBottom: 0,
    },
    box1_Header: {
        width: '50%',
        justifyContent: 'center',
    },
    image_sun: {
        height: 190,
        width: 190,
    },
    box2_Header: {
        width: '50%',
        justifyContent: 'center',
    },
    text1_Header: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        marginTop: 15,
        fontWeight: "500"
    },
    low: {
        color: '#11d023',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
    },
    nothing: {
        color: 'rgb(201, 249, 223)',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
    },
    high: {
        color: 'rgba(255, 0, 0, 0.91)',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
    },
    medium: {
        color: 'rgb(246, 255, 0)',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
    },
    container_Info: {
        flexDirection: 'row',
        padding: 15,
        gap: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_graphic: {
        marginLeft: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderWidth: 0.5,
        borderColor: '#000000',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
});
