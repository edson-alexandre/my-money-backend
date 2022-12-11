import crypto from 'crypto';

export default class CryptographyService {
  private algorithm: string;
  private key: Buffer | string;
  private salt: string;
  private iv: string | null;

  constructor() {
    const { ENCRYPTION_KEY, ENCRYPTION_ALGORITHM, ENCRYPTION_SALT, ENCRYPTION_IV } = process.env;

    this.algorithm = `${ENCRYPTION_ALGORITHM}`;
    this.salt = `${ENCRYPTION_SALT}`;
    const key = Buffer.from(`${ENCRYPTION_KEY}`).toString('hex');
    this.key = key ? Buffer.from(key, 'hex') : '';

    this.iv = `${ENCRYPTION_IV}`;
  }

  encrypt = (value: string | undefined): string | undefined => {
    value = value ? value : '';
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    const buffer = Buffer.from(value, 'utf8').toString('binary');
    const firstPart = cipher.update(buffer, 'binary', 'base64');
    const finalPart = cipher.final('base64');

    return `${firstPart}${finalPart}` || '';
  };

  decrypt = (token: string | undefined): string | undefined => {
    token = token ? token : '';
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    const buffer = Buffer.from(token, 'base64').toString('hex');
    const firstPart = decipher.update(buffer, 'hex', 'base64');
    const finalPart = decipher.final('base64') || '';
    const decrypted = `${firstPart}${finalPart}`;
    const buf = Buffer.from(decrypted, 'base64');
    return buf.toString('utf8') || '';
  };
}
