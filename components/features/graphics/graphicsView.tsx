import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import LottieView from 'lottie-react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Table, Row, Rows } from 'react-native-table-component';
import React, { useState, useEffect } from "react";
import { GraphicsService } from "./services/graphicsService";

export function GraphicsView() {
    const [tableData, setTableData] = useState<{date: String; waterLevel:number; rainLevel:number; rainIntensity?: number}[]>([]);
    const tableHead = ['Hora', 'Nivel Agua (%)', 'Nivel de Lluvia(%)'];
    const MAX_POINTS = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newData = await new GraphicsService().getFormattedTable();

                setTableData(prevData => {
                    let updatedData = [...prevData, ...newData];

                    if (updatedData.length > MAX_POINTS) {
                        updatedData = updatedData.slice(-MAX_POINTS);
                    }

                    return updatedData;
                });
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const getColor = (value:number) => {    
        if (value <= 30) return 'rgb(29, 159, 29)';
        if (value <= 60) return 'rgb(255, 170, 0)';
        return 'rgba(255, 0, 0, 1)';
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <LinearGradient 
                colors={["#0057b7", "#9fc5f8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.body, { flex: 1 }]}
            >
                <ScrollView style={styles.scroll} contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}>
                    <View style={styles.header}>
                        <View style={styles.box1}>
                            <LottieView
                                source={require('../../../assets/lotties/water.json')}
                                loop
                                autoPlay
                                style={styles.animation}
                            />
                        </View>
                        <View style={styles.box2}>
                            <Text style={styles.title}>Últimos 10 datos</Text>
                        </View>
                    </View>
                    <View style={styles.tableContainer}>
                        <Table borderStyle={styles.tableBorder}>
                            <Row 
                                data={tableHead} 
                                style={styles.head} 
                                textStyle={styles.headText} 
                            />
                            <Rows 
                                data={tableData.map(d => 
                                    [
                                        d.date,
                                        <Text style={[{ color: getColor(d.waterLevel)},styles.text2]}>{d.waterLevel}</Text>, 
                                        <Text style={[{ color: getColor(d.rainLevel)},styles.text2]}>{d.rainLevel}</Text>
                                    ]
                                )} 
                                style={styles.row} 
                                textStyle={styles.text} 
                            />
                        </Table>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    head: {
        height: 50,
        backgroundColor: '#007ACC',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    tableBorder: {
        borderWidth: 2,
        borderColor: 'rgba(164, 164, 164, 1)',

    },
    headText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    },
    row: {
        height: 52,
        backgroundColor: 'rgb(255, 255, 255)',
    },
    tableContainer: {
        width: '95%',
        marginTop: 20,
        marginLeft:10,
        marginRight:10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    container: {
        flex: 1,
    },
    body: {
        backgroundColor: '#9fc5f8',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '25%',
        width: '100%',
        backgroundColor: '#02589c',
        flexDirection: 'row',
    },
    scroll: {
        width: '100%',
        height: '100%',
    },
    box1: {
        width: '40%',
        height: 'auto',
    },
    box2: {
        width: '60%',
        height: 'auto',
    },
    animation: {
        height: 150,
        width: 150,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#ffffff',
        lineHeight: 35,
    },
    text: {
        textAlign: 'center',
        fontSize:15,
    },
    text2: {
        textAlign: 'center',
        fontSize:18,
        fontWeight:"bold"
    },
});