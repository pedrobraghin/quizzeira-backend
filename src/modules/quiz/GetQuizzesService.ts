import { InputQuizDTO } from "../../@types/InputQuizDTO";
import { OutputQuizDTO } from "../../@types/OutputQuizDTO";
import { BadRequestError } from "../../errors/BadRequestError";
import { InvalidParametersError } from "../../errors/InvalidParametersError";
import { IQuizzesRepository } from "../../repositories/IQuizzesRepository";
import { ErrorUtils } from "../../utils/ErrorUtils";
import { PaginationUtils } from "../../utils/PaginationUtils";
import { queryQuizValidator } from "../../validators/QuizValidator";

export class GetQuizzesService {
  constructor(private quizzesRepository: IQuizzesRepository) {}

  async execute(
    limit: number,
    offset: number,
    userQuery: Partial<OutputQuizDTO> = {},
    query: Partial<OutputQuizDTO> = {}
  ) {
    const parsedUserQuery = queryQuizValidator.safeParse(userQuery);

    if (!parsedUserQuery.success) {
      throw new BadRequestError(
        ErrorUtils.parseZodError(parsedUserQuery.error.errors)
      );
    }

    const isValidPagination = PaginationUtils.validatePagination(limit, offset);

    if (!isValidPagination) {
      throw new InvalidParametersError(
        "Limit and offset must be numbers and greater than or equal to 0."
      );
    }

    const parsedQuery = { ...parsedUserQuery.data, ...query };
    const { quizzes, quizzesCount } = await this.quizzesRepository.index(
      limit,
      offset,
      parsedQuery,
      "-__v"
    );

    return { quizzes, quizzesCount };
  }
}
