import axios from "axios";

export const fetchUserData = async (user_Id: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/getUser`, { user_Id });
        return response.data;
    } catch (error) {
        const err = error as Error;
        console.error("Error fetching user data:", err.message);
    }
}