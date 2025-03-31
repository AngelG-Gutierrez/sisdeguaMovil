import { useFonts } from "expo-font";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot } from "expo-router";
import { AuthProvider, useAuth } from "../app/context/AuthContext";
import BHomeScreen from "./drawer/(bHome)";
import CGraphicsScreen from "./drawer/(cGraphics)";
import DAboutScreen from "./drawer/(dAbout)";
import EProfile from "./drawer/(eProfile)"
import Entypo from "@expo/vector-icons/build/Entypo";
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator();

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}

function RootLayout() {
  const { isAuthenticated } = useAuth();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; 
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isAuthenticated ? <AuthenticatedScreens /> : <UnauthenticatedScreens />}
    </GestureHandlerRootView>
  );
}

function AuthenticatedScreens() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#ffffff",//rgba(255, 255, 255, 0.9) para transparente
        },
        drawerLabelStyle: {
          color: "#000",
        },
        drawerActiveTintColor: "#2196f3",
        drawerInactiveTintColor: "#444",
      }}
    >
      <Drawer.Screen 
        name="bHome"
        component={BHomeScreen}
        options={{
           title: "Principal",
           drawerIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="cGraphics"
        component={CGraphicsScreen}
        options={{
           title: "Últimos Niveles",
           drawerIcon: ({ color, size }) => (
            <Foundation name="graph-bar" size={size} color={color} />
           ),
        }} 
      />

      <Drawer.Screen 
        name="eProfile"
        component={EProfile}
        options={{
          title: "Perfil",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />           
          ),
        }} 
      />

      <Drawer.Screen 
        name="dAbout"
        component={DAboutScreen}
        options={{
          title: "Acerca de",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="information" size={size} color={color} />
           ),
        }} 
      />
    </Drawer.Navigator>
  );
}

function UnauthenticatedScreens() {
  return <Slot />;
}
