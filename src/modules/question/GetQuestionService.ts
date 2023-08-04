import { IQuestionsRepository } from "../../repositories/IQuestionsReposiroty";
import { InvalidParametersError } from "../../errors/InvalidParametersError";
import { NotFoundError } from "../../errors/NotFoundError";
import { MongoUtils } from "../../utils/MongoUtils";
import { OutputQuestionDTO } from "../../@types/OutputQuestionDTO";
import { queryQuestionValidator } from "../../validators/QuestionValidator";
import { BadRequestError } from "../../errors/BadRequestError";
import { ErrorUtils } from "../../utils/ErrorUtils";

export class GetQuestionService {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute(
    userQuery: Partial<OutputQuestionDTO>,
    query: Partial<OutputQuestionDTO>
  ) {
    const parsedUserQuery = queryQuestionValidator.safeParse(userQuery);

    if (!parsedUserQuery.success) {
      throw new BadRequestError(
        ErrorUtils.parseZodError(parsedUserQuery.error.errors)
      );
    }

    if (query._id) {
      const isValidId = MongoUtils.isValidId(query._id);
      if (!isValidId) {
        throw new InvalidParametersError("Invalid question ID");
      }
    }

    const parsedQuery = { ...parsedUserQuery.data, ...query };

    const question = await this.questionsRepository.getQuestion(
      parsedQuery,
      "+alternatives.isCorrect"
    );

    if (!question) {
      throw new NotFoundError("Question not found");
    }

    console.log(question);

    return question;
  }
}
