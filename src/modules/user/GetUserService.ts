import { NotFoundError } from "../../errors/NotFoundError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class GetUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(identifier: string) {
    const user = await this.usersRepository.getUser(
      identifier,
      "-__v -updatedAt -createdAt"
    );

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }
}
