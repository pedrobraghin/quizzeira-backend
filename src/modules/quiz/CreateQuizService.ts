import { InputQuizDTO } from "../../@types/InputQuizDTO";
import { BadRequestError } from "../../errors/BadRequestError";
import { IQuizzesRepository } from "../../repositories/IQuizzesRepository";
import { createQuizSchemaValidator } from "../../validators/QuizValidator";

export class CreateQuizService {
  constructor(private quizzesRepository: IQuizzesRepository) {}

  async execute(input: InputQuizDTO) {
    const isValidQuizData = createQuizSchemaValidator.safeParse(input);

    if (!isValidQuizData.success) {
      throw new BadRequestError(
        isValidQuizData.error.errors.map((err) => err.message).join(", ")
      );
    }

    const parsedQuizData = input as InputQuizDTO;
    const quiz = await this.quizzesRepository.createQuiz(parsedQuizData);

    return quiz;
  }
}
