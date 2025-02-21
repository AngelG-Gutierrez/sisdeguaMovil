import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { GraphicsService } from "./services/graphicsService";

export function GraphicsCurrent() {
    const [chartData, setChartData] = useState<{ date: string; waterLevel: number; rainLevel: number }[]>([]);    
    const graphicsService = new GraphicsService();
    
    useEffect(() => {
        const fetchData = async () => {
            const formattedData = await graphicsService.getFormattedDataReal();
            setChartData(formattedData.reverse());
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nivel de agua actual</Text>
            {chartData.length > 0 && (
                <LineChart
                    data={{
                        labels: chartData.map((d, i) => (i % 2 === 0 ? d.date : "")), // Alterna etiquetas para más claridad
                        datasets: [{ data: chartData.map(d => d.waterLevel) }]
                    }}
                    width={Dimensions.get("window").width - 70}
                    height={310}
                    yAxisLabel=""
                    yAxisInterval={1} // Controla la separación de etiquetas en el eje Y
                    segments={8} // Más divisiones en el eje Y
                    chartConfig={{
                        backgroundGradientFrom: "#fff",
                        backgroundGradientTo: "#fff",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "3", // Reduce tamaño de los puntos
                            strokeWidth: "1",
                            stroke: "blue",
                        },
                    }}
                    style={styles.chart}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    chart: {
        borderRadius: 16,
    },
});




{/* MODELO DE GRAFICA ANTERIORimport React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { GraphicsService } from "./services/graphicsService";

export function GraphicsCurrent() {
    const [chartData, setChartData] = useState<{ date: string; waterLevel: number; rainLevel: number }[]>([]);    
    const graphicsService = new GraphicsService();
    
    useEffect(() => {
        const fetchData = async () => {
            const formattedData = await graphicsService.getFormattedDataReal();
            setChartData(formattedData.reverse());
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nivel de agua actual</Text>
            
            {chartData.length > 0 && (
                <LineChart
                    data={{
                        labels: chartData.map(d => d.date),
                        datasets: [{ data: chartData.map(d => d.waterLevel)}]
                    }}
                    width={Dimensions.get("window").width - 70}
                    height={310}
                    yAxisLabel=""
                    chartConfig={{
                        backgroundGradientFrom: "#fff",
                        backgroundGradientTo: "#fff",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "5",
                            strokeWidth: "1",
                            stroke: "blue",
                        },
                    }}
                    style={styles.chart}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    chart: {
        borderRadius: 16,
    },
});
*/}