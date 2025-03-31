import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { GraphicsService } from "./services/graphicsService";

export function GraphicsCurrent() {
    const [chartData, setChartData] = useState<{ date: string; waterLevel: number }[]>([]);
    const graphicsService = new GraphicsService();
    const MAX_DATA_POINTS = 5;

    useEffect(() => {
        const fetchData = async () => {
            const newData = (await graphicsService.getFormattedDataReal())[0];

            setChartData(prevData => {
                const updatedData = [...prevData];
                
                updatedData.push(newData);
                
                if (updatedData.length > MAX_DATA_POINTS) {
                    updatedData.shift();
                }

                return updatedData;
            });
        };

        fetchData()
        setInterval(() => {
            fetchData()
        }, 5000);
    }, []);

    const getColor = (value: number) => {
        if (value <= 30) return 'rgba(0, 255, 0, 1)'; // Verde
        if (value <= 60) return 'rgba(255, 165, 0, 1)'; // Naranja
        return 'rgba(255, 0, 0, 1)'; // Rojo
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nivel de agua actual</Text>
            {chartData.length > 0 && (
                <LineChart
                    data={{
                        labels: chartData.map((d, i) => (i % 2 === 0 ? d.date : "")),
                        datasets: [
                            {
                                data: chartData.map(d => d.waterLevel),
                                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                                strokeWidth: 4
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width - 70}
                    height={310}
                    yAxisLabel=""
                    xLabelsOffset={10}
                    yLabelsOffset={25}
                    yAxisSuffix="%"
                    yAxisInterval={1}
                    fromZero={true}
                    segments={10}
                    chartConfig={{
                        backgroundGradientFrom: "#fff",
                        backgroundGradientTo: "#fff",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: { borderRadius: 16 },
                        propsForDots: { r: "4", strokeWidth: "4", stroke: getColor(chartData[chartData.length - 1]?.waterLevel) },
                        propsForLabels: { fontSize: 12 },
                    }}
                    style={styles.chart}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
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