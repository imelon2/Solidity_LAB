import { hexlify, arrayify } from "ethers/lib/utils";
import aes from "aes-js";
import CryptoJS from "crypto-js";

export function _decrypt(data: any, key: Uint8Array, ciphertext: Uint8Array): string {
    const cipher = data.crypto.cipher

    if (cipher === "aes-128-ctr") {
        const iv = arrayify("0x" + data.crypto.cipherparams.iv);
        const counter = new aes.Counter(iv);
        const aesCtr = new aes.ModeOfOperation.ctr(key, counter);
        return hexlify(aesCtr.decrypt(ciphertext));
    }

    return "";
}

export function _encryptAES(phrase: string, password: string) {
    return CryptoJS.AES.encrypt(phrase, password).toString();
}

export function _decryptAES(encryptedPhrase: string, password: string) {
    const decryptedPhraseBytes: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(
        encryptedPhrase,
        password
      );
      const decryptedPhrase = decryptedPhraseBytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedPhrase) {
        return "Fail decryptedPhraseBytes: Wrong password!";
      }
      return decryptedPhrase;
}