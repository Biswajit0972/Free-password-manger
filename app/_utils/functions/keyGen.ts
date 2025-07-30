
export async function getKeyMaterial(password:string) {
  const enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );
}


async function deriveAesKey(password:string, salt:Uint8Array) {
  const keyMaterial = await getKeyMaterial(password);
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt.buffer, // Must be a Uint8Array or ArrayBuffer
      iterations: 100000, // Use a high number for security
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 }, // For AES-GCM 256-bit key
    true, // Extractable
    ["encrypt", "decrypt"]
  );
}

