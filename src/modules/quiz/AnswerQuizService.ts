import { InputQuizAnswerDTO } from "../../@types/InputQuizAnswerDTO";
import { InvalidParametersError } from "../../errors/InvalidParametersError";
import { NotFoundError } from "../../errors/NotFoundError";
import { IQuizzesRepository } from "../../repositories/IQuizzesRepository";
import { MongoUtils } from "../../utils/MongoUtils";

export class AnswerQuizService {
  constructor(private quizzesRepository: IQuizzesRepository) {}

  async execute(input: InputQuizAnswerDTO) {
    const { quizId } = input;

    const isValidQuizId = MongoUtils.isValidId(quizId);
    if (!isValidQuizId) {
      throw new InvalidParametersError("Invalid quiz ID");
    }

    const data = await this.quizzesRepository.getAnswerQuizData(
      quizId.toString()
    );

    if (!data) {
      throw new NotFoundError("Quiz not found");
    }

    const { questions: quizQuestions, percentageToApproval } = data;

    const userAnswers = input.answers.map((answer) => {
      const question = quizQuestions.find(
        (question) => question._id.toString() === answer.questionId
      )!;

      const correctAlternatives = question.alternatives.filter(
        (alternative) => {
          return alternative.isCorrect;
        }
      );

      let isCorrect = true;

      if (
        correctAlternatives.length > answer.answers.length ||
        correctAlternatives.length < answer.answers.length
      ) {
        isCorrect = false;
      } else if (correctAlternatives.length === 1) {
        isCorrect = !!answer.answers.find((answer) => {
          return answer === correctAlternatives[0]._id.toString();
        });
      } else {
        isCorrect = correctAlternatives.reduce((acc, alternative) => {
          const hit = answer.answers.some((answer) => {
            return answer === alternative._id.toString();
          });
          return acc && hit;
        }, true);
      }

      return {
        question: question._id,
        isCorrect,
        userAnswers: answer.answers,
      };
    });

    const hits = userAnswers.reduce((acc, answer) => {
      return answer.isCorrect ? acc + 1 : acc;
    }, 0);

    const approved =
      (hits / quizQuestions.length) * 100 >= percentageToApproval;

    const quizAnswer = await this.quizzesRepository.answerQuiz({
      answers: userAnswers,
      quiz: quizId,
      userId: input.userId,
      hits,
      approved,
    });

    return quizAnswer;
  }
}
