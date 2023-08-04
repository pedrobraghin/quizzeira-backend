import JWTHandler from "../../jwt/JWTHandler";

import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { PasswordUtils } from "../../utils/PasswordUtils";

export class LoginUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(email: string, password: string) {
    const user = await this.usersRepository.getUser(email, "password");

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isValidPass = await PasswordUtils.comparePass(
      password,
      user.password
    );

    if (!isValidPass) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const token = JWTHandler.generateSessionToken(user._id);

    return token;
  }
}
