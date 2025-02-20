import { supabase } from "@/lib/supabase";

export class DataSource {
    constructor() {}

    /** 
     * Registra un nuevo usuario con email y contraseña en Supabase Auth
     */
    async addUser(user: { email: string; password: string }) {
        const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
        });

        if (error) {
            console.error("Error al registrar usuario:", error.message);
            return null;
        }
        return data;
    }

    /** 
     * Inicia sesión con email y contraseña
     */
    async loginUser(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error("Error al iniciar sesión:", error.message);
            return null;
        }
        return data;
    }

    /** 
     * Cierra la sesión del usuario actual
     */
    async logoutUser() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Error al cerrar sesión:", error.message);
            return false;
        }
        return true;
    }

    /** 
     * Obtiene los datos del usuario actualmente autenticado
     */
    async getCurrentUser() {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
            console.error("Error al obtener el usuario:", error.message);
            return null;
        }
        return data;
    }

    /** 
     * Actualiza la contraseña del usuario autenticado
     */
    async updateUser(newPassword: string) {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            console.error("Error al actualizar la contraseña:", error.message);
            return null;
        }
        return data;
    }
}