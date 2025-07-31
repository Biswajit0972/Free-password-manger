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
export function base64ToArrayBuffer(base64: string) {
    const binaryString = atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}