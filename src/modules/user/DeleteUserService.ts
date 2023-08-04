import { IUsersRepository } from "../../repositories/IUsersRepository";

export class DeleteUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string) {
    const deletedUser = await this.usersRepository.deleteUser(id);
    return deletedUser;
  }
}
