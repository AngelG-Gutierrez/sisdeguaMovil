import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {Drawer} from 'expo-router/drawer';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Login from './(aLogin)';
import { SignUpView } from '@/components/features/users/signUpView';
import { Slot, usePathname } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  {/*const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const pathname = usePathname();

  const handleAuthentication = (status:boolean):void => {
    setIsAuthenticated(status);
  };*/}

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  {/*if (pathname === "/aLogin" || pathname === "/aSignUp") {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot />
      </GestureHandlerRootView>
    );
  }*/}
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/*{isAuthenticated ? (*/}
        <Drawer>
          <Drawer.Screen 
            name="(bHomeScreen)"
            options={{ title: "Inicio",
              drawerIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />
            }}
          />
          <Drawer.Screen 
            name="(cGraphicsScreen)" 
            options={{ 
              title: "Histórico del día",
              drawerIcon: ({ color }) => <IconSymbol size={28} name="chart.bar.fill" color={color} /> 
            }} 
          />
          <Drawer.Screen 
            name="(dAboutScreen)" 
            options={{ 
              title: "Acerca de",
              drawerIcon: ({ color }) => <IconSymbol size={28} name="info.circle.fill" color={color} /> 
            }} 
          />
        </Drawer>
      {/*}) : (
        <Slot />
      )}*/}
    </GestureHandlerRootView>
  );
}
