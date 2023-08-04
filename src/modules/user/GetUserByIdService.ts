import { InvalidParametersError } from "../../errors/InvalidParametersError";
import { NotFoundError } from "../../errors/NotFoundError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { MongoUtils } from "../../utils/MongoUtils";

export class GetUserByIdService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string) {
    const isValidId = MongoUtils.isValidId(id);

    if (!isValidId) {
      throw new InvalidParametersError("Invalid ID");
    }

    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }
}
