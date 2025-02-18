import bcrypt from 'react-native-bcrypt';
import { supabase } from "@/lib/supabase";
import { User } from "./user";

export class DataSource {
    constructor() {}

    async addUser(user: { email: string; name: string; lastname: string; password: string }): Promise<User | null> {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(user.password, salt);

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
        } catch (error) {
            console.error("Error al encriptar la contraseña:", error);
            return null;
        }
    }

    async loginUser(email: string, password: string): Promise<User | null> {
        try {
            const { data: user, error } = await supabase
                .from("users")
                .select("*")
                .eq("email", email)
                .single();

            if (error || !user) {
                console.error("Usuario no encontrado.");
                return null;
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                console.error("Contraseña incorrecta.");
                return null;
            }
            return user;
        } catch (error) {
            console.error("Error al verificar la contraseña:", error);
            return null;
        }
    }

    async updateUser(email: string, newPassword: string): Promise<User | null> {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(newPassword, salt);

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
        } catch (error) {
            console.error("Error al encriptar la nueva contraseña:", error);
            return null;
        }
    }
}