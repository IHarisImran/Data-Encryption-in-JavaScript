const crypto = require('crypto');

const encrypt = data => {
    try {
        const key = crypto.randomBytes(32),
            iv = crypto.randomBytes(16);
        data = JSON.stringify({ d: data });
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(data, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')},${encrypted},${key.toString('hex')}`;
    } catch (err) {
        console.log(err.message);
        return null;
    };
};

const decrypt = encryptionKey => {
    try {
        encryptionKey =encryptionKey.split(",")
        const iv = Buffer.from(encryptionKey[0], 'hex'),
            encrypted = Buffer.from(encryptionKey[1], 'hex'),
            key = Buffer.from(encryptionKey[2], 'hex'),
            decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        if (decrypted) {
            decrypted = JSON.parse(decrypted).d;
            return decrypted;
        } else { return null };
    } catch (err) {
        console.log(err.message);
        return null;
    };
};

const encryptedData = encrypt("This is the secret data that only I and the Government of United States knows! 🤫");
console.log(encryptedData);

const decryptedData = decrypt(encryptedData);
console.log(decryptedData);