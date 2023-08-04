import { InputQuizDTO } from "../../@types/InputQuizDTO";
import { InternInputQuizAnswer } from "../../@types/InternInputQuizAnswer";
import { OuputQuizAnswerDTO } from "../../@types/OuputQuizAnswerDTO";
import { OutputQuestionDTO } from "../../@types/OutputQuestionDTO";
import { OutputQuizDTO } from "../../@types/OutputQuizDTO";
import { QuizAnswerSchema } from "../../schemas/QuizAnswerSchema";
import { QuizSchema } from "../../schemas/QuizSchema";
import { MongoUtils } from "../../utils/MongoUtils";
import { IQuizzesRepository } from "../IQuizzesRepository";

export class MongoQuizzesRepository implements IQuizzesRepository {
  async getAnswerQuizData(quizId: string): Promise<{
    questions: OutputQuestionDTO[];
    percentageToApproval: number;
  } | null> {
    const quiz = await QuizSchema.findById(quizId).populate({
      path: "questions",
      select: "+alternatives.isCorrect",
    });

    if (!quiz) return null;

    return {
      questions: quiz.questions as unknown as OutputQuestionDTO[],
      percentageToApproval: quiz.percentageToApproval,
    };
  }

  async createQuiz(input: InputQuizDTO): Promise<OutputQuizDTO> {
    const quiz = await QuizSchema.create(input);
    return quiz;
  }

  async index(
    limit: number,
    offset: number,
    query: Partial<InputQuizDTO>,
    fields: string = ""
  ): Promise<{ quizzes: OutputQuizDTO[]; quizzesCount: number }> {
    const skipCount = MongoUtils.calculateSkipCount(offset, limit);

    const [quizzes, quizzesCount] = await Promise.all([
      QuizSchema.find(query)
        .select(fields)
        .skip(skipCount)
        .limit(limit)
        .populate("author", "fullName nickname")
        .populate({
          path: "questions",
          populate: { path: "author", select: "-_id fullName nickname" },
        }),
      QuizSchema.countDocuments(),
    ]);

    return { quizzes, quizzesCount };
  }

  async getQuiz(
    query: Partial<InputQuizDTO>,
    fields: string = ""
  ): Promise<OutputQuizDTO | null> {
    const quiz = await QuizSchema.findOne(query)
      .select(fields)
      .populate("author", "fullName nickname")
      .populate({
        path: "questions",
        model: "Question",
        populate: [{ path: "author", select: "-_id fullName nickname" }],
      });

    return quiz;
  }

  async updateQuiz(
    id: string,
    newQuiz: Partial<OutputQuizDTO>,
    fields: string = ""
  ): Promise<OutputQuizDTO | null> {
    const quiz = await QuizSchema.findByIdAndUpdate(id, newQuiz, {
      new: true,
    }).select(fields);
    return quiz;
  }

  async deleteQuiz(id: string): Promise<OutputQuizDTO | null> {
    const quiz = await QuizSchema.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true, published: false },
      {
        new: true,
      }
    );

    return quiz;
  }

  async answerQuiz(input: InternInputQuizAnswer): Promise<OuputQuizAnswerDTO> {
    const quizAnswer = await QuizAnswerSchema.create(input);
    const populatedQuiz = await quizAnswer.populate("quiz");
    await populatedQuiz.populate({
      path: "answers",
      populate: { path: "question" },
    });
    return populatedQuiz;
  }

  async getQuizAnswers(input: {
    id: string;
    userId: string;
  }): Promise<OuputQuizAnswerDTO[]> {
    const quizAnswer = await QuizAnswerSchema.find(input)
      .populate({
        path: "answers",
        populate: { path: "question" },
      })
      .populate({
        path: "quiz",
        populate: { path: "questions" },
      });
    return quizAnswer;
  }

  async deleteQuizAnswer(
    quizAnswerId: string,
    userId: string
  ): Promise<OuputQuizAnswerDTO | null> {
    const deletedQuizAnswer = await QuizAnswerSchema.findOneAndDelete({
      _id: quizAnswerId,
      userId,
    });
    return deletedQuizAnswer;
  }
}
