import { AES, enc } from "crypto-js";

function customTextToBytes(text: string) {
  const bytes = [];
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    if (charCode <= 0x7f) {
      bytes.push(charCode);
    } else if (charCode <= 0x7ff) {
      bytes.push((charCode >> 6) | 0xc0);
      bytes.push((charCode & 0x3f) | 0x80);
    } else if (charCode <= 0xffff) {
      bytes.push((charCode >> 12) | 0xe0);
      bytes.push(((charCode >> 6) & 0x3f) | 0x80);
      bytes.push((charCode & 0x3f) | 0x80);
    } else {
      bytes.push((charCode >> 18) | 0xf0);
      bytes.push(((charCode >> 12) & 0x3f) | 0x80);
      bytes.push(((charCode >> 6) & 0x3f) | 0x80);
      bytes.push((charCode & 0x3f) | 0x80);
    }
  }
  return new Uint8Array(bytes);
}

const convertToHex = (code: any) => {
  return new Uint8Array(code).reduce(
    (acc, x) => acc + ("00" + x.toString(16)).slice(-2),
    ""
  );
};

const generateKey = async (password: string, length: number) => {
  const keyArray = new Uint8Array(length);
  const textBytes = await customTextToBytes(password);
  for (let i = 0; i < textBytes.length; i++) {
    keyArray[i] = textBytes[i];
  }
  for (let i = textBytes.length; i < length; i++) {
    keyArray[i] = 0;
  }
  return enc.Hex.parse(convertToHex(keyArray)); // Ensure the key is in Hex format
};

export const decryptValue = async (value: string, password: string) => {
  const key = await generateKey(password, 32); // 32 bytes for AES-256
  const iv = await generateKey(password, 16); // 16 bytes for IV

  try {
    if (!value || typeof value !== "string" || value.trim() === "") {
      console.error("Invalid value passed to decryptValue");
      return null;
    }

    // Use enc.Base64 to decode the ciphertext before decrypting
    const decrypted = AES.decrypt(value, key, { iv });
    const decryptedStr = decrypted.toString(enc.Utf8);

    return decryptedStr;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
