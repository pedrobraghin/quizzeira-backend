import InputUserDTO from "../../@types/InputUserDTO";

import { OutputUserDTO } from "../../@types/OutputUserDTO";
import { UserSchema } from "../../schemas/UserSchema";
import { IUsersRepository } from "../IUsersRepository";

export class MongoUsersRepository implements IUsersRepository {
  async getUser(
    identifier: string,
    fields: string = ""
  ): Promise<OutputUserDTO | null> {
    const user = await UserSchema.findOne({
      $or: [{ email: identifier }, { nickname: identifier }],
    }).select(fields);
    return user;
  }

  async createUser(input: InputUserDTO): Promise<OutputUserDTO> {
    const user = await UserSchema.create(input);
    return user;
  }

  async index(fields: string = ""): Promise<OutputUserDTO[]> {
    const users = await UserSchema.find().select(fields);
    return users;
  }

  async getUserById(
    id: string,
    fields: string = ""
  ): Promise<OutputUserDTO | null> {
    const user = await UserSchema.findById(id).select(fields);
    return user;
  }

  async deleteUser(id: string): Promise<OutputUserDTO | null> {
    const deletedUser = await UserSchema.findByIdAndDelete(id);
    return deletedUser;
  }

  async updateUser(
    id: string,
    input: Partial<InputUserDTO>,
    fields: string = ""
  ): Promise<OutputUserDTO | null> {
    const updatedUser = await UserSchema.findByIdAndUpdate(id, input, {
      new: true,
    }).select(fields);

    return updatedUser;
  }
}
