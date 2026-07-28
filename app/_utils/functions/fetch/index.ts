import axios from "axios";
import {Password} from "@/app/_lib/models/password/password.model";
import {Encryption} from "@/app/_utils/type";

export type CreateVaultPayload = {
    user_id: string;
    vaultName: string;
    wrappedVaultKey: string;
    salt: string;
    version: string;
    wrapIv: string;
};

export const fetchUserData = async (user_id: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${user_id}`);
    return response.data?.data;
}

export const createPassword = async (data:Encryption) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/password/create`, data);
    return response.data?.data;
}

export const fetchPasswords = async (user_id: string, vault_id:string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/password/getPassword?user_id=${user_id}&vault_id=${vault_id}`);
    return response.data!.data;
}

export const deletePassword = async (data: {password_id:string, vault_id:string}) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/password/deletepassword`, {data});
    return response.data?.data;
}

export const fetchVaults = async (user_id: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/vault/${user_id}`);
    return response.data.data;
}

export const createVault = async (data: CreateVaultPayload) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/vault/create`, data);
    return response.data.data as { vaultId: string; vaultName: string };
};


export const fetchVaultById = async (vaultId:string, authUserId:string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/vault/getById?vault_id=${vaultId}&user_id=${authUserId}`);
    return response.data.data
}