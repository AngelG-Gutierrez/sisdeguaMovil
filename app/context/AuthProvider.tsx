import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import * as Notifications from "expo-notifications";
import { registrarParaNotificacionesPush, configurarListenersNotificaciones } from "@/components/features/sensorData/services/pushNotificationService";

interface AuthContextType {
  isAuthenticated: boolean;
  pushToken: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pushToken, setPushToken] = useState<string | null>(null);

  useEffect(() => {
    // Verificar estado de autenticación del usuario
    const verificarUsuario = async () => {
      const { data } = await supabase.auth.getUser();
      setIsAuthenticated(!!data?.user);
    };
    verificarUsuario();

    // Registrar para notificaciones push
    let notificationListener: Notifications.Subscription | undefined;
    let responseListener: Notifications.Subscription | undefined;

    const configurarNotificaciones = async () => {
      const token = await registrarParaNotificacionesPush();
      setPushToken(token ?? null);

      // Configurar los listeners de notificaciones
      const listeners = configurarListenersNotificaciones();
      notificationListener = listeners.notificationListener;
      responseListener = listeners.responseListener;
    };

    configurarNotificaciones();

    return () => {
      // Limpiar listeners al desmontar el componente
      if (notificationListener) Notifications.removeNotificationSubscription(notificationListener);
      if (responseListener) Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error("Error al iniciar sesión", error.message);
      return false;
    }

    setIsAuthenticated(true);
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, pushToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};