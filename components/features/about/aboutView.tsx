import { LinearGradient } from "expo-linear-gradient";
import { Text, View, StyleSheet, ScrollView, Dimensions, StatusBar, Image, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

const { width, height } = Dimensions.get("window");

export function AboutView(){
    return(
        <View>
            <StatusBar backgroundColor="white" barStyle="dark-content"/>
            <ScrollView>
            <View style={styles.aboutApp}>
                <LinearGradient 
                    colors={["#9fc5f8", "#0057b7"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.body}
                >
                    <View>
                        <Image
                            style={styles.image}
                            source={require("../../../assets/images/logo_sisdegua.png")}
                        />
                    </View>
                    <View style={styles.boxA}>
                        <View style={styles.boxB}>
                            <View style={styles.boxB_B}>
                                <Text style={styles.title}>¿Porqué SISDEGUA?</Text>
                                <Text style={styles.text}>SIStema de Detección de dEsbordamientos de aGUA.</Text>
                            </View>
                            <View style={styles.boxB_B}>
                                <Text style={styles.title}>Tu seguridad es nuestra prioridad.</Text>
                                <Text style={styles.text}>Conoce más acerca de los desarrolladores. <AntDesign name="arrowdown" size={22} color="black" /></Text>
                            </View>
                        </View>
                        <View style={styles.boxC}>
                            <Text style={styles.title}>Objetivo</Text>
                            <Text style={styles.text}>Con sensores IoT, capturar los niveles de agua e intensidad de lluvia para dar a conocer las probabilidades de desbordamientos de agua y a través de la aplicación notificar alertas a los usuarios.
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>
            <View style={styles.aboutApp}>
                <LinearGradient 
                    colors={["#0057b7", "#9fc5f8"]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.body}
                >
                    <View>
                        <Text style={styles.titleBig}>Equipo desarrollador</Text>
                    </View>
                    <View style={styles.box1}>
                        <View style={styles.box2}>
                            <TouchableOpacity>
                                <View style={styles.box3}>
                                    <View>
                                        <Text style={styles.titleTarget}>Ángel Antelmo Gutierrez Gadea</Text>
                                    </View>
                                    <Image
                                    style={styles.photo}
                                    source={require("../../../assets/images/Ale.jpeg")}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.box2}></View>
                    </View>
                    <View style={styles.box1}>
                        <View style={styles.box2}></View>
                        <View style={styles.box2}>
                            <TouchableOpacity>
                                <View style={styles.box3}>
                                    <View>
                                        <Text style={styles.titleTarget}>Genaro Alfredo Silva Espinoza</Text>
                                    </View>
                                    <Image
                                    style={styles.photo}
                                    source={require("../../../assets/images/Ale.jpeg")}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.box1}>
                        <View style={styles.box2}>
                            <TouchableOpacity>
                                <View style={styles.box3}>
                                    <View>
                                        <Text style={styles.titleTarget}>Alejandro Hernández Hernández</Text>
                                    </View>
                                    <Image
                                    style={styles.photo}
                                    source={require("../../../assets/images/Ale.jpeg")}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.box2}></View>
                    </View>
                </LinearGradient>
            </View>
        </ScrollView>
        </View>
    );    
}

const styles = StyleSheet.create({
    body:{
        backgroundColor: '#9fc5f8',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    aboutApp:{
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        height: 150,
        width: 240,
        marginTop: -50,
        marginBottom: 40,
    },
    boxA:{
        flexDirection: 'row',
        width: '100%',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxB:{
        width: '45%',
        height: 'auto',
        gap: 5,
    },
    boxB_B:{
        width: '100%',
        height: 197,
        borderWidth: 0.5,
        borderColor: '#000000',
        borderRadius: 20,
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    boxC:{
        padding: 15,
        width: '45%',
        height: 400,
        borderWidth: 0.5,
        borderColor: '#000000',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    aboutCreators:{
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color: '#222222',
        lineHeight: 25,
    },
    titleBig:{
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 27,
        marginBottom: 6,
        marginTop: -50,
    },
    title:{
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 6,
    },
    photo:{
        height: 170,
        width: 150,
        borderRadius: 15,
    },
    box1:{
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box2:{
        width: '48%',
        height: 130,
    },
    box3:{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        height: 250,
        padding: 10,
        borderColor: '#000000',
        borderRadius: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    titleTarget:{
        color: '#ffffff',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
})