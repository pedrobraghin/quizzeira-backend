import { InvalidParametersError } from "../../errors/InvalidParametersError";
import { NotFoundError } from "../../errors/NotFoundError";
import { IQuizzesRepository } from "../../repositories/IQuizzesRepository";
import { MongoUtils } from "../../utils/MongoUtils";

export class DeleteQuizService {
  constructor(private quizzesRepository: IQuizzesRepository) {}

  async execute(id: string) {
    const isValidId = MongoUtils.isValidId(id);

    if (!isValidId) {
      throw new InvalidParametersError("Invalid ID");
    }

    const deletedQuiz = await this.quizzesRepository.deleteQuiz(id);

    if (!deletedQuiz) {
      throw new NotFoundError("Quiz not found");
    }

    return deletedQuiz;
  }
}
