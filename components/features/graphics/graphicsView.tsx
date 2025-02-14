import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart, XAxis } from "react-native-svg-charts";
import { GraphicsService } from "./services/graphicsService";

export function GraphicsView() {
    const [chartData, setChartData] = useState<any[]>([]);
    const graphicsService = new GraphicsService();

    useEffect(() => {
        const fetchData = async () => {
            const formattedData = await graphicsService.getFormattedData();
            setChartData(formattedData);
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nivel de agua actual</Text>
            <LineChart
                style={styles.chart}
                data={chartData.map(d => d.waterLevel)}
                svg={{ stroke: "blue" }}
                contentInset={{ top: 20, bottom: 20 }}
            />
            <XAxis
                style={styles.xAxis}
                data={chartData.map((_, index) => index)}
                formatLabel={(value, index) => chartData[index]?.date ?? ""}
                contentInset={{ left: 20, right: 20 }}
                svg={{ fontSize: 10, fill: "black" }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    chart: {
        height: 200,
        width: "100%",
    },
    xAxis: {
        marginTop: 10,
    },
});