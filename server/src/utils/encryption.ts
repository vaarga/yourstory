import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import { EncryptedText } from '../types';

const ALGORITHM = 'aes-256-ctr';
const ENCODING = 'hex';

export const encryptText = (secretKey: string, text: string) => {
    const iv = randomBytes(16);
    const cipher = createCipheriv(ALGORITHM, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString(ENCODING),
        content: encrypted.toString(ENCODING),
    };
};

export const decryptText = (secretKey: string, encryptedText: EncryptedText) => {
    const decipher = createDecipheriv(ALGORITHM, secretKey, Buffer.from(encryptedText.iv, ENCODING));
    const decryptedText = Buffer.concat(
        [decipher.update(Buffer.from(encryptedText.content, ENCODING)), decipher.final()]
    );

    return decryptedText.toString();
};
