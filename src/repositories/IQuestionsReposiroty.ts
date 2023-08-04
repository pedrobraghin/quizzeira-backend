import { InputQuestionDTO } from "./../@types/InputQuestionDTO";
import { OutputQuestionDTO } from "../@types/OutputQuestionDTO";

export interface IQuestionsRepository {
  createQuestion(input: InputQuestionDTO): Promise<OutputQuestionDTO>;
  getQuestion(
    query: Partial<InputQuestionDTO>,
    fields?: string
  ): Promise<OutputQuestionDTO | null>;
  index(
    query: Partial<InputQuestionDTO>,
    fields: string
  ): Promise<{ questions: OutputQuestionDTO[]; questionsCount: number }>;
  updateQuestion(
    id: string,
    userId: string,
    input: Partial<InputQuestionDTO>,
    fields?: string
  ): Promise<OutputQuestionDTO | null>;
  deleteQuestion(id: string, userId: string): Promise<OutputQuestionDTO | null>;
}
