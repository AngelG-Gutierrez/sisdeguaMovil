import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ProbabilityInfo } from "../probability/probabilityInfo";
import { GraphicsView } from "../graphics/graphicsView";

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
        <View style={styles.body}>
            <View style={styles.box_Header}>
                <View style={styles.box1_Header}>
                    <Image
                    style={styles.image}
                        source={require("../../../assets/images/sol.png")}
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
        </View>
    );
}

const styles = StyleSheet.create({
    body:{
        backgroundColor: '#9fc5f8',
        height: '100%',
        width: '100%',
    },
    box_Header:{
        flexDirection: 'row',
        marginTop: 20,
        padding: 15,
    },
    box1_Header:{
        width: '50%',
        height: 'auto',
        justifyContent: 'center',
        alignContent: 'center',
    },
    image:{
        height: 170,
        width: 170,
    },
    box2_Header:{
        width: '50%',
        height: 'auto',
        justifyContent: 'center',
        alignContent: 'center',
    },
    text1_Header:{
        textAlign: 'center',
        fontSize: 27,
    },
    low:{
        color: 'green',
        textAlign: 'center',
        fontSize: 25,
        marginTop: 15
    },
    high:{
        color: 'red',
        textAlign: 'center',
        fontSize: 25,
        marginTop: 15,
    },
    medium:{
        color: 'yellow',
        textAlign: 'center',
        fontSize: 25,
        marginTop: 15,
    },
    container_Info:{
        flexDirection: 'row',
        padding: 15,
        gap: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box1_Container:{
        height: 250,
        width: 180,
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    container_graphic:{
        height: 300,
        width: 380,
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginLeft: 32,
    },
})