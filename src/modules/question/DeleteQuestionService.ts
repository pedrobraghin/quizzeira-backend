import mongoose from "mongoose";
import { NotFoundError } from "../../errors/NotFoundError";
import { IQuestionsRepository } from "../../repositories/IQuestionsReposiroty";
import { InvalidParametersError } from "../../errors/InvalidParametersError";

export class DeleteQuestionService {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute(id: string, userId: string) {
    if (!mongoose.isObjectIdOrHexString(id)) {
      throw new InvalidParametersError("Invalid ID format");
    }
    const deletedQuestion = await this.questionsRepository.deleteQuestion(
      id,
      userId
    );

    if (!deletedQuestion) {
      throw new NotFoundError("Question not found");
    }

    return deletedQuestion;
  }
}
