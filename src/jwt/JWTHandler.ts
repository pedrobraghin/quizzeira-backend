import jwt, { JwtPayload } from "jsonwebtoken";
import EAccessLevel from "../enums/EAccessLevel";
import { ForbiddenError } from "../errors/ForbiddenError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

interface Payload extends JwtPayload {
  id: string;
}

export default class JWTHandler {
  public static generateSessionToken(id: string): string {
    const SECRET = String(process.env.JWT_SECRET);
    const expiresIn = String(process.env.JWT_SESSION_EXPIRES_IN);

    const token = jwt.sign({ id }, SECRET, { expiresIn });

    return token;
  }

  public static validateToken(token: string): Payload {
    const SECRET = String(process.env.JWT_SECRET);

    try {
      const payload = jwt.verify(token, SECRET) as Payload;
      return payload;
    } catch (err) {
      throw new UnauthorizedError("Invalid or expired token");
    }
  }

  public static generateResetPassToken(id: string) {
    const SECRET = String(process.env.JWT_SECRET);
    const expiresIn = String(process.env.JWT_RESET_PASS_EXPIRES_IN);

    const token = jwt.sign({ id }, SECRET, { expiresIn });

    return token;
  }
}
