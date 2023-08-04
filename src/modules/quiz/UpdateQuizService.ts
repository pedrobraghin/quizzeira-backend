import { InputQuizDTO } from "../../@types/InputQuizDTO";
import { InvalidParametersError } from "../../errors/InvalidParametersError";
import { NotFoundError } from "../../errors/NotFoundError";
import { IQuizzesRepository } from "../../repositories/IQuizzesRepository";
import { MongoUtils } from "../../utils/MongoUtils";

export class UpdateQuizService {
  constructor(private quizzesRepository: IQuizzesRepository) {}

  async execute(id: string, input: Partial<InputQuizDTO>) {
    const isValidId = MongoUtils.isValidId(id);
    if (!isValidId) {
      throw new InvalidParametersError("Invalid ID");
    }

    const updatedFields = Object.keys(input).join(" ");
    const updatedQuiz = await this.quizzesRepository.updateQuiz(
      id,
      input,
      updatedFields
    );

    if (!updatedQuiz) {
      throw new NotFoundError("Quiz not found");
    }

    return updatedQuiz;
  }
}
