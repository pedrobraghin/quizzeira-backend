import { InvalidParametersError } from "../../errors/InvalidParametersError";
import { IQuizzesRepository } from "../../repositories/IQuizzesRepository";
import { MongoUtils } from "../../utils/MongoUtils";

export class DeleteQuizAnswerService {
  constructor(private quizzesRepository: IQuizzesRepository) {}

  async execute(quizAnswerId: string, userId: string) {
    const isValidQuizId = MongoUtils.isValidId(quizAnswerId);
    const isValidUserId = MongoUtils.isValidId(userId);

    if (!isValidQuizId) {
      throw new InvalidParametersError("Invalid quiz answer id");
    }

    if (!isValidUserId) {
      throw new InvalidParametersError("Invalid user id");
    }

    const deletedQuizAnswer = await this.quizzesRepository.deleteQuizAnswer(
      quizAnswerId,
      userId
    );

    return deletedQuizAnswer;
  }
}
