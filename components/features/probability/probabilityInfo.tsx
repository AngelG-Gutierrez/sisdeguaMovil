import { IconSymbol } from "@/components/ui/IconSymbol";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProbabilityService } from "./services/probabilityService";
import LottieView from 'lottie-react-native';

export function ProbabilityInfo(){

    const [probabilityData, setProbabilityData] = useState<any[]>([]);
    const probabilityService = new ProbabilityService();

    useEffect(() => {
        const fetchData = async () => {
            const formattedData = await probabilityService.getFormattedData();
            setProbabilityData(formattedData);
        };

        fetchData();
    }, []);

    const averageWaterLevel = probabilityData.length > 0 
        ? probabilityData.reduce((sum, data) => sum + data.waterLevel, 0) / probabilityData.length 
        : 0;


    const averageRainLevel = probabilityData.length > 0 
        ? probabilityData.reduce((sum, data) => sum + data.rainLevel, 0) / probabilityData.length 
        : 0;

    return(
        <View style={styles.cards}>
            <View style = {styles.box1_Container}>
                <View style={styles.iconPorcent}>
                    <View>
                        <LottieView
                            source={require('../../../assets/lotties/water.json')}
                            loop
                            autoPlay
                            style={styles.icon}
                        />
                    </View>
                    <View>
                        <Text style={styles.rainLevel}>{averageWaterLevel}%</Text>
                    </View>
                </View>
                <Text style={styles.text1}>Nivel de agua promedio</Text>
                <Text style={styles.text2}>60%</Text>
            </View>

            <View style = {styles.box1_Container}>
                <View style={styles.iconPorcent}>
                    <View>
                        <LottieView
                            source={require('../../../assets/lotties/rain.json')}
                            loop
                            autoPlay
                            style={styles.icon2}
                        />
                    </View>
                    <Text style={styles.rainLevel}>{averageRainLevel}%</Text>
                </View>
                    <Text style={styles.text1}>Nivel de precipitación promedio</Text>
                    <Text style={styles.text2}>18%</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    iconPorcent:{
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginLeft: -10,
    },

    box1_Container:{
        height: 220,
        width: '48%',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },

    icon:{
        height: 85,
        width: 85,
    },

    icon2:{
        padding: 0,
        margin: 0,
        height: 90,
        width: 90,
        marginBottom: -10,
        marginTop: 5,
    },

    rainLevel:{
        fontSize: 25,
    },

    text1:{
        fontSize: 16,
        textAlign: "center",
        marginTop: 5,
    },

    text2:{
        fontSize: 25,
        textAlign: "center",
        marginTop: 5,
    },

    cards:{
        flexDirection:"row",
        gap: 15,
    }
})