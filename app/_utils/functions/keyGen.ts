
export async function cryptoKeyGen(masterPassword: string) {
    const baseKey1 = await genBaseKey(masterPassword);

    const salt = window.crypto.getRandomValues(new Uint8Array(16));

    const derivedKey = await window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 1000000,
            hash: "SHA-256"
        },
        baseKey1,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );

    return derivedKey;
}

export const genBaseKey = async (masterPassword: string): Promise<CryptoKey> => {
    const enc = new TextEncoder();
    const stringToArray = enc.encode(masterPassword);
    // ! encode convert string to Uint8Array
    return await window.crypto.subtle.importKey("raw", stringToArray, "PBKDF2", false, ["deriveKey"]);
}



export async function encryptData(data: string, key: CryptoKey, iv: Uint8Array<ArrayBuffer>) {
    const enc = new TextEncoder();
    const stringToArray = enc.encode(data);


    const encryptedData = await window.crypto.subtle.encrypt({
        name: "AES-GCM",
        iv: iv,
    },
        key,
        stringToArray
    );



    const encryptedBase64 = arrayBufferToBase64(encryptedData);
    const ivBase64 = arrayBufferToBase64(iv.buffer);

    console.log("Encrypted (base64):", encryptedBase64);
    console.log("IV (base64):", ivBase64);

    return { encryptedData, iv };

}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    const binary = String.fromCharCode(...bytes);
    return btoa(binary);
}

export async function decryptData(encryptedData: ArrayBuffer, key: CryptoKey, iv: Uint8Array<ArrayBuffer>): Promise<string> {
    const decryptedData = await window.crypto.subtle.decrypt({
        name: "AES-GCM",
        iv: iv,
    },
        key,
        encryptedData
    );

    const decryptedString = new TextDecoder().decode(decryptedData);
    return decryptedString;
}