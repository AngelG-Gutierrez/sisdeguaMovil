import { useFonts } from "expo-font";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot } from "expo-router";
import { AuthProvider, useAuth } from "../app/context/AuthContext";
import BHomeScreen from "./drawer/(bHomeScreen)";
import CGraphicsScreen from "./drawer/(cGraphicsScreen)";
import DAboutScreen from "./drawer/(dAboutScreen)";

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
    <Drawer.Navigator>
      <Drawer.Screen 
        name="bHomeScreen"
        component={BHomeScreen}
        options={{ title: "Inicio" }}
      />
      <Drawer.Screen 
        name="cGraphicsScreen"
        component={CGraphicsScreen}
        options={{ title: "Histórico del día" }} 
      />
      <Drawer.Screen 
        name="dAboutScreen"
        component={DAboutScreen}
        options={{ title: "Acerca de" }} 
      />
    </Drawer.Navigator>
  );
}

function UnauthenticatedScreens() {
  return <Slot />;
}
