import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

// Configurar el comportamiento de las notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Registrar para recibir notificaciones push y devolver el token
export async function registrarParaNotificacionesPush() {
  let token;
  
  if (Constants.isDevice) {
    const { status: estadoExistente } = await Notifications.getPermissionsAsync();
    let estadoFinal = estadoExistente;
    
    if (estadoExistente !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      estadoFinal = status;
    }
    
    if (estadoFinal !== 'granted') {
      console.log('¡No se pudo obtener permiso para notificaciones push!');
      return null;
    }
    
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Token de notificación:', token);
  } else {
    console.log('Debes usar un dispositivo físico para las notificaciones push');
  }

  return token;
}

// Para notificaciones locales dentro de la app
export async function programarNotificacionLocal(titulo: string, mensaje: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: titulo,
      body: mensaje,
      data: { datoExtra: 'Información adicional' },
    },
    trigger: null, // null significa mostrar inmediatamente
  });
}

// Para enviar notificaciones push desde tu servidor a los dispositivos
export async function enviarNotificacionPush(expoPushToken: string, titulo: string, mensaje: string) {
  try {
    const notificacion = {
      to: expoPushToken,
      sound: 'default',
      title: titulo,
      body: mensaje,
      data: { datoExtra: 'Información adicional' },
    };

    // Nota: En una app real, esta llamada API debería hacerse desde tu servidor
    const respuesta = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificacion),
    });
    
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    throw error;
  }
}

// Configurar los listeners de notificaciones
export function configurarListenersNotificaciones() {
  const notificationListener = Notifications.addNotificationReceivedListener(
    notification => {
    }
  );
  
  const responseListener = Notifications.addNotificationResponseReceivedListener(
    response => {
    }
  );

  return { notificationListener, responseListener };
}