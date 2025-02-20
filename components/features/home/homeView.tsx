import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { ProbabilityInfo } from "../probability/probabilityInfo";
import { GraphicsView } from "../graphics/graphicsView";
import LottieView from 'lottie-react-native';
import { LinearGradient } from "expo-linear-gradient";
import { ProbabilityService } from "../probability/services/probabilityService";

export function HomeView(){

    const [level,setLevel] = useState("");
    const probabilityService = new ProbabilityService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await probabilityService.getFormattedData();
                if (data.length > 0) {
                    setLevel(data[data.length - 1].rainIntensity);
                }
            } catch (error) {
                console.error("Error obteniendo los datos de intensidad de lluvia:", error);
            }
        };

        fetchData();
    }, []);

    const getColorRain = () => {
        switch (level) {
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

    return(
        <View>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>
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
                        <Text style={[getColorRain()]}>{level}</Text>
                        <Text style={styles.text1_Header}>Intensidad de Lluvia</Text>
                        <Text style={[getColorRain()]}>{level}</Text>
                    </View>
                </View>
                <View style={styles.container_Info}>
                    <ProbabilityInfo/>
                </View>
                <View style={styles.container_graphic}>
                    <GraphicsView/>
                </View>            
            </ScrollView>
        </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    body:{
        backgroundColor: '#9fc5f8',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box_Header:{
        flexDirection: 'row',
        padding: 15,
        paddingLeft: 0,
        paddingBottom: 0,
    },
    box1_Header:{
        width: '50%',
        height: 'auto',
        justifyContent: 'center',
        alignContent: 'center',  
    },
    image_sun:{
        height: 190,
        width: 190,
        padding: 0,
        margin: 0,
    },
    box2_Header:{
        width: '50%',
        height: 'auto',
        justifyContent: 'center',
        alignContent: 'center',
    },
    text1_Header:{
        textAlign: 'center',
        fontSize: 18,
        fontWeight:"500"
    },
    low:{
        color: 'rgb(132, 248, 0)',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom:10
    },
    high:{
        color: '#CC0033',
        textAlign: 'center',
        fontSize: 25,
        marginTop: 10,
        fontWeight: 'bold',
    },
    medium:{
        color: 'yellow',
        textAlign: 'center',
        fontSize: 25,
        marginTop: 10,
        fontWeight: 'bold',
    },
    container_Info:{
        flexDirection: 'row',
        padding: 15,
        gap: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_graphic:{
        marginLeft: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        width: '90%',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
})