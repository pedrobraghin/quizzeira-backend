import InputUserDTO from "../@types/InputUserDTO";
import { OutputUserDTO } from "../@types/OutputUserDTO";

export interface IUsersRepository {
  createUser(input: InputUserDTO): Promise<OutputUserDTO>;
  index(fields?: string): Promise<OutputUserDTO[]>;
  getUserById(id: string, fields?: string): Promise<OutputUserDTO | null>;
  getUser(identifier: string, fields?: string): Promise<OutputUserDTO | null>;
  deleteUser(id: string): Promise<OutputUserDTO | null>;
  updateUser(
    id: string,
    input: Partial<InputUserDTO>,
    fields?: string
  ): Promise<OutputUserDTO | null>;
}
