/**
 * Converts an ArrayBuffer to a base64 string.
 * @param {ArrayBuffer} buffer The ArrayBuffer to convert.
 * @returns {string} The base64 string.
 * * btoa is a built-in function in JavaScript that converts a binary string to a base64 string.
 */
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    const binary = String.fromCharCode(...bytes);
    return btoa(binary);
}

/**
 * Converts a base64 string to an ArrayBuffer.
 * @param {string} base64 The base64 string to convert.
 * @returns {ArrayBuffer} The ArrayBuffer.
 * * atob is a built-in function in JavaScript that converts a base64 string to a binary string.
 */
export function base64ToArrayBuffer(base64: string): Uint8Array<ArrayBuffer> {
    const binaryString = atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

export const genBaseKey = async (masterPassword: string): Promise<CryptoKey> => {
    const enc = new TextEncoder();
    const stringToArray = enc.encode(masterPassword);
    // ! encode convert string to Uint8Array
    return await window.crypto.subtle.importKey("raw", stringToArray, "PBKDF2", true, ["deriveKey"]);
}

export const genDerivedKey = async (baseKey: CryptoKey, salt: Uint8Array<ArrayBuffer>): Promise<CryptoKey> => {
    return await window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256",
        },
        baseKey,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
}

// ? password and username encryption and decryption started here

export const encryptData = async (data: string, key: CryptoKey, iv: Uint8Array<ArrayBuffer>): Promise<{ cipherText: string, iv: string }> => {
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

    return { cipherText: encryptedBase64, iv: ivBase64 };
}

export const decryptData = async (encryptedData: ArrayBuffer, key: CryptoKey, iv: Uint8Array<ArrayBuffer>): Promise<string> => {
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

// ? password and username encryption and decryption ended here

// ** encryption of derived key started here

export const encryptDerivedKey = async (baseKey: CryptoKey, derivedKey: CryptoKey, keyIv: Uint8Array<ArrayBuffer>): Promise<{ encryptedKey: string, iv: string }> => {
    const rawDerivedKey = await window.crypto.subtle.exportKey("raw", derivedKey);

    const encryptedKey = await window.crypto.subtle.encrypt({
        name: "AES-GCM",
        iv: keyIv
    },
        baseKey,
        rawDerivedKey);

    const encryptedKeyBase64 = arrayBufferToBase64(encryptedKey);
    const base64KeyIv = arrayBufferToBase64(keyIv.buffer);

    return { encryptedKey: encryptedKeyBase64, iv: base64KeyIv };
}

export const decryptDerivedKey = async (baseKey: CryptoKey, cipheredKey: Uint8Array<ArrayBuffer>, iv: Uint8Array<ArrayBuffer>) => {
    const rawDerivedKey = await window.crypto.subtle.decrypt({
        name: "AES-GCM",
        iv: iv.buffer
    },
        baseKey,
        cipheredKey.buffer);//     console.log(rawDerivedKey);

    const derivedKey = await window.crypto.subtle.importKey(
        "raw",
        rawDerivedKey,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
   
    return derivedKey;
}
