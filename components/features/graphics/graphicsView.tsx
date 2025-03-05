import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import { GraphicsCurrent } from "./graphicCurrent";
import LottieView from 'lottie-react-native';
import { LinearGradient } from "expo-linear-gradient";

export function GraphicsView() {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content"/>
                <LinearGradient 
                    colors={["#0057b7", "#9fc5f8"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.body, { flex: 1}]}
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
                                <Text style={styles.title}>Histórico del día</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                        </View>
                    </ScrollView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    body:{
        backgroundColor: '#9fc5f8',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header:{
        justifyContent: 'center',
        alignItems: 'center',
        height: '25%',
        width: '100%',
        backgroundColor: '#02589c',
        flexDirection: 'row',
    },
    scroll:{
        width: '100%',
        height: '100%',
    },
    box1:{
        width: '40%',
        height: 'auto',
    },
    box2:{
        width: '60%',
        height: 'auto',
    },
    animation:{
        height: 150,
        width: 150,
    },
    title:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#ffffff',
        lineHeight: 35,
    },
    text: {
        color: '#222222',
        marginBottom: 20,
        width: '80%',
        textAlign: 'center',
    },
});
