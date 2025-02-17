import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";
import { User } from "./user";

export class DataSource{
    constructor(){}

    async addUser(user: { email: string; name: string; lastname: string; password: string }): Promise<User | null> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const { data, error } = await supabase
            .from("users")
            .insert({
                email: user.email,
                name: user.name,
                lastname: user.lastname,
                password: hashedPassword,
            })
            .select()
            .single();

        if (error) {
            console.error("Error al registrar usuario:", error.message);
            return null;
        }
        return data;
    }

    async loginUser(email: string, password: string): Promise<User | null> {
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();
    
        if (error || !user) {
            console.error("Usuario no encontrado.");
            return null;
        }
    
        const validPassword = await bcrypt.compare(password, user.password);
    
        if (!validPassword) {
            console.error("Contraseña incorrecta.");
            return null;
        }
        return user;
    }

    async updateUser(email: string, newPassword: string): Promise<User | null> {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
    
        const { data, error } = await supabase
            .from("users")
            .update({ password: hashedPassword })
            .eq("email", email)
            .select()
            .single();
    
        if (error) {
            console.error("Error al actualizar la contraseña:", error.message);
            return null;
        }
        return data;
    }
}