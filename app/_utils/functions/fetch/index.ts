import axios from "axios";
import { Password } from "@/app/_lib/models/password/password.model";

export const fetchUserData = async (user_id: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/getuser`, { user_id });
        return response.data;
    } catch (error) {
        const err = error as Error;
        console.error("Error fetching user data:", err.message);
    }
}

export const createPassword = async (user_id: string, username: string, password_obj: Password, application_link: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/password/create`, {
            user_id,
            username,
            password_obj,
            application_link
        });
        return response.data;
    } catch (error) {
        const err = error as Error;
        console.error("Error creating password:", err.message);
    }
}
