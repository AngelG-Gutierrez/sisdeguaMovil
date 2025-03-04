import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProbabilityService } from "./services/probabilityService";
import LottieView from 'lottie-react-native';

export function ProbabilityInfo(){

    const [probabilityData, setProbabilityData] = useState<any[]>([]);
    const [levelRain,setLevelRain] = useState(0);
    const [levelWater,setlevelWater] = useState(0);
    const probabilityService = new ProbabilityService();

    useEffect(() => {
        const fetchData = async () => {
            const data = await probabilityService.getFormattedDataReal();
            //const dataProm = await probabilityService.getFormattedDate();
            setLevelRain(data[0]?.rainLevel)
            setlevelWater(data[0]?.waterLevel)
            setProbabilityData(data);
        };

        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    /*const averageWaterLevel = probabilityData.length > 0 
    ? Math.trunc(probabilityData.reduce((sum, data) => sum + data.waterLevel, 0) / probabilityData.length)
    : 0;

    const averageRainLevel = probabilityData.length > 0 
    ? Math.trunc(probabilityData.reduce((sum, data) => sum + data.rainLevel, 0) / probabilityData.length)
    : 0;*/

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
                        <Text style={styles.rainLevel}>{levelWater}%</Text>
                    </View>
                </View>
                {/*<Text style={styles.text1}>Nivel de agua promedio</Text>
                <Text style={styles.text2}>{averageWaterLevel}%</Text>*/}
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
                    <Text style={styles.rainLevel}>{levelRain}%</Text>
                </View>
                    {/*<Text style={styles.text1}>Nivel de precipitación promedio</Text>
                    <Text style={styles.text2}>{averageRainLevel}%</Text>*/}
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
        borderWidth: 0.5,
        borderColor: '#000000',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
        fontSize: 22,
        textAlign: "center",
        marginTop: 5,
    },

    cards:{
        flexDirection:"row",
        gap: 15,
    }
})