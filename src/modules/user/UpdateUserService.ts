import InputUserDTO from "../../@types/InputUserDTO";

import { NotFoundError } from "../../errors/NotFoundError";
import { BadRequestError } from "../../errors/BadRequestError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { updateUserSchemaValidator } from "../../validators/UserValidators";

export class UpdateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string, input: Partial<InputUserDTO>) {
    const isValidUserData = await updateUserSchemaValidator.safeParseAsync(
      input
    );

    if (!isValidUserData.success) {
      throw new BadRequestError(
        isValidUserData.error.errors
          .map((err) => {
            return err.message;
          })
          .join(", ")
      );
    }
    const updatedFields = Object.keys(input).join(" ");

    const updatedUser = await this.usersRepository.updateUser(
      id,
      input,
      `-_id ${updatedFields}`
    );

    if (!updatedUser) {
      throw new NotFoundError("User not found");
    }

    return updatedUser;
  }
}
