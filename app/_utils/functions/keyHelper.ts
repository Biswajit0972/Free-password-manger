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
export async function deriveMasterKey(
    password: string,
    salt: Uint8Array<ArrayBuffer>
): Promise<CryptoKey> {

    const passwordKey = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt,
            iterations: 600000,
            hash: "SHA-256",
        },
        passwordKey,
        {
            name: "AES-GCM",
            length: 256,
        },
        false,
        ["encrypt", "decrypt"]
    );
}
// ? password and username encryption and decryption started here

export const encryptData = async (data: string, key: CryptoKey, iv: string): Promise<{ cipherText: string, iv: string }> => {
    const enc = new TextEncoder();
    const stringToArray = enc.encode(data);
    const ivBuffer = base64ToArrayBuffer(iv);

    const encryptedData = await window.crypto.subtle.encrypt({
        name: "AES-GCM",
        iv: ivBuffer,
    },
        key,
        stringToArray
    );

    const encryptedBase64 = arrayBufferToBase64(encryptedData);
    const ivBase64 = arrayBufferToBase64(ivBuffer.buffer);

    return { cipherText: encryptedBase64, iv: ivBase64 };
}

export const decryptData = async (encryptedData: string, key: CryptoKey, iv: string): Promise<string> => {
    const decryptedData = await window.crypto.subtle.decrypt({
        name: "AES-GCM",
        iv: base64ToArrayBuffer(iv),
    },
        key,
        base64ToArrayBuffer(encryptedData)
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

export async function importVaultKey(
    rawKey: ArrayBuffer
): Promise<CryptoKey> {
    return await crypto.subtle.importKey(
        "raw",
        rawKey,
        {
            name: "AES-GCM",
        },
        true,
        ["encrypt", "decrypt"]
    );
}

export function generateSalt(length: number = 16) {
    return crypto.getRandomValues(new Uint8Array(length));
}
export function generateIv(length: number = 12) {
    return crypto.getRandomValues(new Uint8Array(length));
}