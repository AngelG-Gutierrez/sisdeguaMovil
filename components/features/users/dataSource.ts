import { supabase } from "@/lib/supabase";

export class DataSource {
    constructor() {}

    /**
     * Registra un nuevo usuario y guarda su perfil en la base de datos
     */
    async addUser(user: { email: string; password: string; name: string; lastname: string }) {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
        });

        if (authError) {
            console.error("Error al registrar usuario:", authError.message);
            return null;
        }

        const userId = authData?.user?.id;
        if (!userId) return null;

        const { data: profileData, error: profileError } = await supabase
            .from("users")
            .insert({
                id: userId,
                email: user.email,
                name: user.name,
                lastname: user.lastname,
            })
            .select()
            .single();

        if (profileError) {
            console.error("Error al guardar perfil:", profileError.message);
            return null;
        }

        return profileData;
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
     * Obtiene los datos del usuario autenticado junto con su perfil
     */
    async getCurrentUser() {
        const { data: authData, error: authError } = await supabase.auth.getUser();

        if (authError || !authData?.user) {
            console.error("Error al obtener el usuario:", authError?.message);
            return null;
        }

        const userId = authData.user.id;

        const { data: profileData, error: profileError } = await supabase
            .from("users")
            .select("name, lastname, email") 
            .eq("id", userId)
            .single();

        if (profileError) {
            console.error("Error al obtener perfil:", profileError.message);
            return null;
        }

        return profileData;
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

    /**
     * Cierra sesión del usuario
     */
    async logoutUser() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Error al cerrar sesión:", error.message);
            return false;
        }
        return true;
    }
}