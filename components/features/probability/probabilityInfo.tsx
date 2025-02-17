import { IconSymbol } from "@/components/ui/IconSymbol";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProbabilityService } from "./services/probabilityService";


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
                <IconSymbol 
                        name="water.waves.and.arrow.up"
                        size={70} 
                        color="blue"
                    />
                    <Text style={styles.rainLevel}>{averageWaterLevel}%</Text>
                </View>
                    <Text style={styles.text1}>Nivel de agua promedio</Text>
                    <Text style={styles.text2}>60%</Text>
            </View>

            <View style = {styles.box1_Container}>
                <View style={styles.iconPorcent}>
                <IconSymbol 
                        name="drop.fill"
                        size={70} 
                        color="blue"
                    />
                    <Text style={styles.rainLevel}>{averageRainLevel}%</Text>
                </View>
                    <Text style={styles.text1}>Nivel de precipitación promedio</Text>
                    <Text style={styles.text2}>18%</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "40%",
        backgroundColor: "#e7f0fd"
    },

    iconPorcent:{
        flexDirection: "row",
        marginTop: 15
    },

    box1_Container:{
        height: 250,
        width: 180,
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
        
    },

    rainLevel:{
        fontSize: 40,
        marginLeft: 10,
        marginTop: 10
    },

    text1:{
        fontSize: 24,
        textAlign: "center",
        marginTop: 5
    },

    text2:{
        fontSize: 30,
        textAlign: "center",
        marginTop: 15
    },

    cards:{
        flexDirection:"row",
        gap: 10
        
    }
})