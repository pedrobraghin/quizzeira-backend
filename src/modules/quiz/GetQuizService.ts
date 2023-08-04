import { InputQuizDTO } from "../../@types/InputQuizDTO";
import { OutputQuizDTO } from "../../@types/OutputQuizDTO";
import { BadRequestError } from "../../errors/BadRequestError";
import { InvalidParametersError } from "../../errors/InvalidParametersError";
import { NotFoundError } from "../../errors/NotFoundError";
import { IQuizzesRepository } from "../../repositories/IQuizzesRepository";
import { ErrorUtils } from "../../utils/ErrorUtils";
import { MongoUtils } from "../../utils/MongoUtils";
import { queryQuizValidator } from "../../validators/QuizValidator";

export class GetQuizService {
  constructor(private quizzesRepository: IQuizzesRepository) {}

  async execute(
    userQuery: Partial<OutputQuizDTO> = {},
    query: Partial<OutputQuizDTO>
  ) {
    const parsedUserQuery = queryQuizValidator.safeParse(userQuery);

    if (!parsedUserQuery.success) {
      throw new BadRequestError(
        ErrorUtils.parseZodError(parsedUserQuery.error.errors)
      );
    }

    if (query._id) {
      const isValidId = MongoUtils.isValidId(query._id);

      if (!isValidId) {
        throw new InvalidParametersError("Invalid ID");
      }
    }

    const parsedQuery = { ...parsedUserQuery.data, ...query };

    const quiz = await this.quizzesRepository.getQuiz(parsedQuery, "-__v");

    if (!quiz) {
      throw new NotFoundError("Quiz not found");
    }

    return quiz;
  }
}
