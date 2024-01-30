const crypto = require('crypto'),
    key = crypto.randomBytes(32),
    iv = crypto.randomBytes(16);

const encrypt = data => {
    data = JSON.stringify({ d: data })
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
};

const decrypt = encryptionKey => {
    const iv = Buffer.from(encryptionKey.iv, 'hex'),
        encrypted = Buffer.from(encryptionKey.encryptedData, 'hex'),
        decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return JSON.parse(decrypted.toString());
};


const encryptedData = encrypt("This is the secret data that only I and the Government of United States know! 🤫");
console.log(encryptedData);

const decryptedData = decrypt(encryptedData);
console.log(decryptedData);