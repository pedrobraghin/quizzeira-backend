import { IQuizzesRepository } from "../../repositories/IQuizzesRepository";
import { MongoQuizzesRepository } from "../../repositories/implementations/MongoQuizzesRepository";

const QuizzesRepository: IQuizzesRepository = new MongoQuizzesRepository();

export default QuizzesRepository;
