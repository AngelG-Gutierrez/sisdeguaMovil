import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { GraphicsService } from "./services/graphicsService";

export function GraphicsCurrent() {
    const [chartData, setChartData] = useState<{ date: string; waterLevel: number; rainLevel: number }[]>([]);
    //const [previousPoint, setPreviousPoint] = useState<{ date: string; waterLevel: number; rainLevel: number } | null>(null);
    const graphicsService = new GraphicsService();

    {/*useEffect(() => {
        const fetchData = async () => {
            const newData = await graphicsService.getFormattedDataReal();
            if (chartData.length > 0) {
                setPreviousPoint(chartData[chartData.length - 1]);
                setTimeout(() => setPreviousPoint(null), 1000); 
            }
            setChartData(newData);
        };

        const interval = setInterval(fetchData, 1000);

        return () => clearInterval(interval);
    }, [chartData]);

    const displayedData = previousPoint ? [...chartData, previousPoint] : chartData;*/}

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
                                strokeWidth: 2
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width - 70}
                    height={310}
                    yAxisLabel=""
                    yAxisInterval={1}
                    segments={8}
                    chartConfig={{
                        backgroundGradientFrom: "#fff",
                        backgroundGradientTo: "#fff",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: { borderRadius: 16 },
                        propsForDots: { r: "3", strokeWidth: "1" },
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