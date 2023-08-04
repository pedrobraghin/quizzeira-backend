import bcrypt from "bcrypt";

export class PasswordUtils {
  static async hashPass(password: string): Promise<string> {
    const SALT = Number(process.env.BSCRYPT_SALT);

    const hashed = await bcrypt.hash(password, SALT);

    return hashed;
  }

  static async comparePass(
    password: string,
    encrypted: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, encrypted);
  }
}
