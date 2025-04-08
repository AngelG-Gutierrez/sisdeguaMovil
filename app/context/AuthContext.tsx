import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email:string, password: string) => Promise<boolean>;
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

  useEffect(() => {
    const checkUser = async () =>{
      const {data} = await supabase.auth.getUser();
      setIsAuthenticated(!!data?.user);
    };
    checkUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const {data, error} = await supabase.auth.signInWithPassword({ email, password});
    if (error){
      console.error("Error al iniciar sesión", error.message);
      return false;
    }

    setIsAuthenticated(true);
    return true;
  }

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  }
  
  //const login = () => setIsAuthenticated(true);
  //const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
