import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {createPassword, createVault, CreateVaultPayload, deletePassword, fetchUserData} from "../functions/fetch";
import { queryClient } from "@/app/query/Provider";
import {Encryption} from "@/app/_utils/type";


export const useFetch = <T,>(queryKey: string, queryFn: () => Promise<T>) => {
    const { data, error, isLoading,  isError} = useQuery<T>({
        queryKey: [queryKey],
        queryFn
    });

    useEffect(() => {
        if (error) {
            toast.error(error.message || "An error occurred while fetching data");
        }
    }, [error]);

    return { data, isLoading, error,   isError };
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
        mutationFn: (data: Encryption) => createPassword(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["passwords"] });
        }
    });
}

export const useDeletePassword = () => {
    return useMutation({
        mutationKey: ["deletePassword"],
        mutationFn: (data: {password_id:string, vault_id:string}) => deletePassword(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["passwords"] });
        }
    });
}

export const useCreateVault = () => {
    return useMutation({
        mutationKey: ["createVault"],
        mutationFn: (data: CreateVaultPayload) => createVault(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetchVaults"] });
        },
    });
};
