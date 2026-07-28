
export const generateVaultKey = async () => {
    try {
        return await window.crypto.subtle.generateKey({
                name: "AES-GCM",
                length: 256
            },
            true,
            ["encrypt", "decrypt"]);
    } catch (err) {
        const er = err as Error;
        console.log(er.message);
    }
}