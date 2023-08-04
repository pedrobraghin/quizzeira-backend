import { InputQuestionDTO } from "../../@types/InputQuestionDTO";
import { BadRequestError } from "../../errors/BadRequestError";
import { IQuestionsRepository } from "../../repositories/IQuestionsReposiroty";
import { ErrorUtils } from "../../utils/ErrorUtils";
import { createQuestionSchemaValidator } from "../../validators/QuestionValidator";

export class CreateQuestionService {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute(input: InputQuestionDTO) {
    const isValidQuestionData = createQuestionSchemaValidator.safeParse(input);
    if (!isValidQuestionData.success) {
      throw new BadRequestError(
        ErrorUtils.parseZodError(isValidQuestionData.error.errors)
      );
    }

    const questionParsedData = isValidQuestionData.data as InputQuestionDTO;

    const isMultiAnswer =
      questionParsedData.alternatives.reduce((acc, alternative) => {
        return (acc = alternative.isCorrect ? acc + 1 : acc);
      }, 0) > 1;

    Object.assign(questionParsedData, { multiAnswer: isMultiAnswer });
    const question = await this.questionsRepository.createQuestion(
      questionParsedData
    );

    return question;
  }
}
