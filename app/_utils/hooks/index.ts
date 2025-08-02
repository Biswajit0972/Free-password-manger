import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { fetchUserData } from "../functions/fetch";

export const useFetch = <T,>(queryKey: string, queryFn: () => Promise<T>) => {
    const { data, error, isLoading } = useQuery<T>({
        queryKey: [queryKey],
        queryFn
    });

    useEffect(() => {
        if (error) {
            toast.error(error.message || "An error occurred while fetching data");
        }
    }, [error]);

    return { data, isLoading }
}

export const useGetUserData = ( ) => {
    return useMutation({
        mutationKey: ["userData"],
        mutationFn: (user_id:  string) => fetchUserData(user_id)
    });
}