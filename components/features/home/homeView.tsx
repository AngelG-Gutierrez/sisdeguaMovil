import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ProbabilityInfo } from "../probability/probabilityInfo";
import { GraphicsView } from "../graphics/graphicsView";
import LottieView from 'lottie-react-native';
import { LinearGradient } from "expo-linear-gradient";

export function HomeView(){

    const level = 'red'

    const getLevelColor = () => {
        switch (level) {
            case "red":
                return styles.high;
            {/*break;
            case "red":
                return styles.medium;
            break;
            case "red":
                return styles.high;
            break;
            default:
                return 0;
            break;*/}
        }
    }

    return(
        <View>
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
                        <Text style={styles.text1_Header}>Probabilidad de desbordamientos</Text>
                        <Text style={[getLevelColor()]}>Alta</Text>
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
    },
    low:{
        color: 'green',
        textAlign: 'center',
        fontSize: 25,
        marginTop: 10,
        fontWeight: 'bold',
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