import { OutputQuestionDTO } from "../../@types/OutputQuestionDTO";
import { BadRequestError } from "../../errors/BadRequestError";
import { IQuestionsRepository } from "../../repositories/IQuestionsReposiroty";
import { ErrorUtils } from "../../utils/ErrorUtils";
import { queryQuestionValidator } from "../../validators/QuestionValidator";
import { QueryOptions } from "mongoose";
export class GetAllQuestionsService {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute(
    userQuery: Partial<OutputQuestionDTO>,
    query: Partial<QueryOptions<OutputQuestionDTO>>
  ) {
    const parsedUserQuery = queryQuestionValidator.safeParse(userQuery);

    if (!parsedUserQuery.success) {
      throw new BadRequestError(
        ErrorUtils.parseZodError(parsedUserQuery.error.errors)
      );
    }

    const parsedQuery = { ...parsedUserQuery.data, ...query };
    const questions = await this.questionsRepository.index(
      parsedQuery,
      "+alternatives.isCorrect"
    );

    return questions;
  }
}
