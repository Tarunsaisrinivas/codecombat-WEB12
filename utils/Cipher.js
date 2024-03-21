import CryptoJS from "crypto-js";


export const decrypt = (encryptedCode) => {
    if (!encryptedCode) {
        return null;
    }
    var bytes  = CryptoJS.AES.decrypt(encryptedCode, 'NIPUNA');
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  };

  export const encrypt = (code) => {
    const encrypted = CryptoJS.AES.encrypt(code, 'NIPUNA').toString();
    return encrypted;
};