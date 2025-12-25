import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {createPassword, deletePassword, fetchUserData} from "../functions/fetch";
import {  Password } from "@/app/_lib/models/password/password.model";
import { queryClient } from "@/app/query/Provider";

type Encryption ={
    user_id: string;
        username: string;
        password_obj: Password;
        application_link: string;
}

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

export const useGetUserData = () => {
    return useMutation({
        mutationKey: ["userData"],
        mutationFn: (user_id: string) => fetchUserData(user_id)
    });
}

export const useCreatePassword = () => {
    return useMutation({
        mutationKey: ["createPassword"],
        mutationFn: (data: Encryption) => createPassword(data.user_id, data.username, data.password_obj, data.application_link),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["passwords"] });
        }
    });
}

export const useDeletePassword = () => {
    return useMutation({
        mutationKey: ["deletePassword"],
        mutationFn: (password_id: string) => deletePassword(password_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["passwords"] });
        }
    });
}