import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {Drawer} from 'expo-router/drawer';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Login from './(aLogin)';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
      <Login></Login>
      {/*<Drawer>
        <Drawer.Screen 
        name="(aHomeScreen)/index"
        options={{ title: "Inicio",
          drawerIcon:({color})=><IconSymbol size={28} name="house.fill" color={color}/>
        }}
        />
        <Drawer.Screen name="(bGraphicsScreen)/index" 
        options={{ 
          title: "Histórico del día",
          drawerIcon:({color})=><IconSymbol size={28} name="chart.bar.fill" color={color}/> }} 
        />
        <Drawer.Screen name="(cAboutScreen)/index" 
        options={{ 
          title: "Acerca de",
          drawerIcon:({color})=><IconSymbol size={28} name="info.circle.fill" color={color}/> }} 
        />
      </Drawer>*/}
    </GestureHandlerRootView>
  );
}
