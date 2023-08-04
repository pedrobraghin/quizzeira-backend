import { InvalidParametersError } from "../../errors/InvalidParametersError";
import { NotFoundError } from "../../errors/NotFoundError";
import { IQuizzesRepository } from "../../repositories/IQuizzesRepository";
import { MongoUtils } from "../../utils/MongoUtils";

export class GetQuizAnswerService {
  constructor(private quizzesRepository: IQuizzesRepository) {}

  async execute(input: { userId: string; _id?: string; quiz?: string }) {
    if (input._id != undefined) {
      const isValidId = MongoUtils.isValidId(input._id);
      if (!isValidId) {
        throw new InvalidParametersError("Invalid ID");
      }
    }

    const quizAnswer = await this.quizzesRepository.getQuizAnswers(input);

    if (!quizAnswer) {
      throw new NotFoundError("Quiz answer not found");
    }

    return quizAnswer;
  }
}
