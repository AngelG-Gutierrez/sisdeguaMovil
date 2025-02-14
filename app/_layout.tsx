import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {Drawer} from 'expo-router/drawer';
import { IconSymbol } from '@/components/ui/IconSymbol';

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
      <Drawer>
        <Drawer.Screen 
        name="(ahomeScreen)" 
        options={{ title: "Inicio",
          drawerIcon:({color})=><IconSymbol size={28} name="house.fill" color={color}/>
        }}
        />
        <Drawer.Screen name="(bgraphics)" 
        options={{ 
          title: "Gráfica",
          drawerIcon:({color})=><IconSymbol size={28} name="person.fill" color={color}/> }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
