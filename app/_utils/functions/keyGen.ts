export async function cryptoKeyGen(masterPassword: string, salt: Uint8Array) {

}

export async function genBaseKey (masterPassword: string) {
    const enc = new TextEncoder();
    const conKey = enc.encode(masterPassword);
    console.log(conKey);;
}