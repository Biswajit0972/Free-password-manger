
import {  arrayBufferToBase64, base64ToArrayBuffer, decryptDerivedKey, encryptDerivedKey, genBaseKey, genDerivedKey } from "./keyHelper"

export const cryptoKeyGen = async (masterPassword: string, saltKey: string, saltEnKey: string, enKeyIv: string) => {
    try {
        const basekey = await genBaseKey(masterPassword);
        const salt = base64ToArrayBuffer(saltKey);
        const saltEn = base64ToArrayBuffer(saltEnKey);
        const enIv = base64ToArrayBuffer(enKeyIv);
        const derivedKeyForDataEn = await genDerivedKey(basekey, salt)
        const derivedKeyForEnKey = await genDerivedKey(basekey, saltEn)

        const { encryptedKey } = await encryptDerivedKey(derivedKeyForEnKey, derivedKeyForDataEn, enIv);

        sessionStorage.setItem("encryptedKey", encryptedKey);
        sessionStorage.setItem("enIv", arrayBufferToBase64(enIv.buffer));
        
        return derivedKeyForEnKey;
    } catch (error) {
        const err = error as Error;
        console.log(err.message);
    }
}

export const decryptSessionKey = async (derivedKey: CryptoKey, enIv: Uint8Array<ArrayBuffer>) => {
    try {
        const encryptedKey = sessionStorage.getItem("encryptedKey");
        const encryptedKeyBuffer = base64ToArrayBuffer(encryptedKey!);
        
        const dataEnKey =  await decryptDerivedKey(derivedKey, encryptedKeyBuffer, enIv);
      return dataEnKey;
    } catch (error) {
        const err = error as Error;
        console.log(err.message);
    }
}

