import { InputQuestionDTO } from "../../@types/InputQuestionDTO";
import { InvalidParametersError } from "../../errors/InvalidParametersError";
import { NotFoundError } from "../../errors/NotFoundError";
import { IQuestionsRepository } from "../../repositories/IQuestionsReposiroty";
import { MongoUtils } from "../../utils/MongoUtils";

export class UpdateQuestionService {
  constructor(private questions: IQuestionsRepository) {}
  async execute(id: string, userId: string, input: Partial<InputQuestionDTO>) {
    const isValidId = MongoUtils.isValidId(id);

    if (!isValidId) {
      throw new InvalidParametersError("Invalid ID");
    }

    const updatedFields = Object.keys(input).join(" ");
    const updatedQuestions = await this.questions.updateQuestion(
      id,
      userId,
      input,
      updatedFields
    );

    if (!updatedQuestions) {
      throw new NotFoundError("Question not found");
    }

    return updatedQuestions;
  }
}
