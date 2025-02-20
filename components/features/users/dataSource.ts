import { supabase } from "@/lib/supabase";

export class DataSource {
    constructor() {}

    async addUser(user: { name:string, lastname:string, email: string; password: string }) {
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

    async logoutUser() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Error al cerrar sesión:", error.message);
            return false;
        }
        return true;
    }

    async getCurrentUser() {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
            console.error("Error al obtener el usuario:", error.message);
            return null;
        }
        return data;
    }

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