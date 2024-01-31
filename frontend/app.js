import CryptoJS from "crypto-js";

export default function encryption() {
  const data = "This is the secret data that only I and the Government of United States knows! 🤫",
    secretKey = "Qwerty123@",
    encrypted = CryptoJS.AES.encrypt(data, secretKey),
    decrypted = CryptoJS.AES.decrypt(encrypted, secretKey),
    formatted = decrypted.toString(CryptoJS.enc.Utf8);

  console.log(`Origional: ${data}`);
  console.log(`Encrypted: ${encrypted}`);
  console.log(`Decrypted: ${formatted}`);
};