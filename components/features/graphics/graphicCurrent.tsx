import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { GraphicsService } from "./services/graphicsService";

export function GraphicsCurrent() {
    const [chartData, setChartData] = useState<{ date: string; waterLevel: number}[]>([]);
    const graphicsService = new GraphicsService();

    useEffect(() => {
        const fetchData = async () => {
            const newData = (await graphicsService.getFormattedDataReal()).reverse();
            setChartData(newData);
        };

        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, []);

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
                    segments={10}
                    chartConfig={{
                        backgroundGradientFrom: "#fff",
                        backgroundGradientTo: "#fff",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: { borderRadius: 16 },
                        propsForDots: { r: "4", strokeWidth: "4" },
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