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
            setLevelRain(data[0]?.rainLevel)
            setlevelWater(data[0]?.waterLevel)
        };

        fetchData()
        setInterval(() => {
            fetchData()
        }, 5000);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const dataProm = await probabilityService.getFormattedDate();
            setProbabilityData(dataProm);
        };
        fetchData()
        setInterval(() => {
            fetchData()
        }, 5000);
    }, []);

    const averageWaterLevel = probabilityData.length > 0 
    ? Math.trunc(probabilityData.reduce((sum, data) => sum + data.waterLevel, 0) / probabilityData.length)
    : 0;

    const averageRainLevel = probabilityData.length > 0 
    ? Math.trunc(probabilityData.reduce((sum, data) => sum + data.rainLevel, 0) / probabilityData.length)
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
                        <Text style={styles.text1}>Nivel actual</Text>
                        <Text style={styles.rainLevel}>{levelWater}%</Text>
                    </View>
                    
                </View>
                <Text style={{textAlign:"center"}}>---------------------------</Text>
                <Text style={styles.text1}>Nivel de agua promedio en el día</Text>
                <Text style={styles.text2}>{averageWaterLevel}%</Text>
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
                    <View>
                        <Text style={styles.text1}>Nivel actual</Text>
                        <Text style={styles.rainLevel}>{levelRain}%</Text>
                    </View>

                </View>
                    <Text style={{textAlign:"center"}}>-------------------------</Text>
                    <Text style={styles.text1}>Nivel de precipitación promedio en el día</Text>
                    <Text style={styles.text2}>{averageRainLevel}%</Text>
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
        marginLeft:20,
        marginTop:5,
        fontWeight:"bold"
    },

    text1:{
        fontSize: 16,
        textAlign:"center",
        marginLeft:5,
        marginRight:5,
        marginTop: 15,
        fontWeight:"400"
    },

    text2:{
        fontSize: 22,
        textAlign: "center",
        marginTop: 20,
        fontWeight:"bold"
    },

    cards:{
        flexDirection:"row",
        gap: 15,
    }
})