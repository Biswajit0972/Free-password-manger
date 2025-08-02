import axios from "axios";

export const fetchUserData = async (user_id: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/getuser`, { user_id });
        return response.data;
    } catch (error) {
        const err = error as Error;
        console.error("Error fetching user data:", err.message);
    }
}