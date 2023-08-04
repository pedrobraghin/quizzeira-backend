import InputUserDTO from "../../@types/InputUserDTO";

import { PasswordUtils } from "../../utils/PasswordUtils";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { createUserSchemaValidator } from "../../validators/UserValidators";
import { EmailService } from "../../services/EmailService";
import { BadRequestError } from "../../errors/BadRequestError";
import EAccessLevel from "../../enums/EAccessLevel";

export class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(input: InputUserDTO, isAdmin: boolean = false) {
    const isValidUserData = createUserSchemaValidator.safeParse(input);

    if (!isValidUserData.success) {
      throw new BadRequestError(
        isValidUserData.error.errors.map((err) => err.message).join(", ")
      );
    }
    const userParsedData = isValidUserData.data as InputUserDTO;

    if (isAdmin) {
      userParsedData.accessLevel = EAccessLevel.ADMIN_ACCESS;
    } else {
      userParsedData.accessLevel = EAccessLevel.USER_ACCESS;
    }

    const hashedPass = await PasswordUtils.hashPass(input.password);
    const user = await this.usersRepository.createUser({
      ...userParsedData,
      password: hashedPass,
    });

    const emailService = new EmailService();
    emailService.sendWelcomeEmail(user, "welcome");

    return { _id: user._id, email: user.email, name: user.name };
  }
}
