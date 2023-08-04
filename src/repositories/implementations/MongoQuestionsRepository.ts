import { InputQuestionDTO } from "../../@types/InputQuestionDTO";
import { OutputQuestionDTO } from "../../@types/OutputQuestionDTO";
import { IQuestionsRepository } from "../IQuestionsReposiroty";
import { QuestionSchema } from "../../schemas/QuestionSchema";

export class MongoQuestionsRepository implements IQuestionsRepository {
  async index(
    query: Partial<InputQuestionDTO>,
    fields: string = ""
  ): Promise<{ questions: OutputQuestionDTO[]; questionsCount: number }> {
    const [questions, questionsCount] = await Promise.all([
      QuestionSchema.find(query)
        .select(fields)
        .populate("author", "fullName nickname"),
      QuestionSchema.countDocuments(query),
    ]);

    return { questions, questionsCount };
  }
  async createQuestion(input: InputQuestionDTO): Promise<OutputQuestionDTO> {
    const question = await QuestionSchema.create(input);
    return question;
  }

  async getQuestion(
    query: Partial<InputQuestionDTO>,
    fields: string = ""
  ): Promise<OutputQuestionDTO | null> {
    const question = await QuestionSchema.findOne(query).select(fields);
    return question;
  }

  async updateQuestion(
    id: string,
    userId: string,
    input: Partial<InputQuestionDTO>,
    fields: string = ""
  ): Promise<OutputQuestionDTO | null> {
    const updatedQuestion = await QuestionSchema.findOneAndUpdate(
      { _id: id, author: userId },
      input,
      {
        new: true,
      }
    ).select(fields);

    return updatedQuestion;
  }

  async deleteQuestion(
    id: string,
    userId: string
  ): Promise<OutputQuestionDTO | null> {
    const updatedQuestion = await QuestionSchema.findOneAndUpdate(
      { _id: id, author: userId, deleted: false },
      { deleted: true, published: false },
      {
        new: true,
      }
    );

    return updatedQuestion;
  }
}
