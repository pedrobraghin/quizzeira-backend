import { InputQuizDTO } from "../@types/InputQuizDTO";
import { InternInputQuizAnswer } from "../@types/InternInputQuizAnswer";
import { OuputQuizAnswerDTO } from "../@types/OuputQuizAnswerDTO";
import { OutputQuestionDTO } from "../@types/OutputQuestionDTO";
import { OutputQuizDTO } from "../@types/OutputQuizDTO";

export interface IQuizzesRepository {
  index(
    limit: number,
    offset: number,
    query: Partial<InputQuizDTO>,
    fields?: string
  ): Promise<{ quizzes: OutputQuizDTO[]; quizzesCount: number }>;
  createQuiz(input: InputQuizDTO): Promise<OutputQuizDTO>;
  getQuiz(
    query: Partial<OutputQuizDTO>,
    fields?: string
  ): Promise<OutputQuizDTO | null>;
  getAnswerQuizData(quizId: string): Promise<{
    questions: OutputQuestionDTO[];
    percentageToApproval: number;
  } | null>;
  updateQuiz(
    id: string,
    newQuiz: Partial<OutputQuizDTO>,
    fields?: string
  ): Promise<OutputQuizDTO | null>;
  deleteQuiz(id: string): Promise<OutputQuizDTO | null>;
  answerQuiz(input: InternInputQuizAnswer): Promise<OuputQuizAnswerDTO>;
  getQuizAnswers(input: {
    userId: string;
    id?: string;
  }): Promise<OuputQuizAnswerDTO[]>;
  deleteQuizAnswer(
    quizAnswerId: string,
    userId: string
  ): Promise<OuputQuizAnswerDTO | null>;
}
