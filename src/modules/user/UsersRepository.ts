import { IUsersRepository } from "../../repositories/IUsersRepository";
import { MongoUsersRepository } from "../../repositories/implementations/MongoUsersRepository";

const UsersRepository: IUsersRepository = new MongoUsersRepository();

export default UsersRepository;
