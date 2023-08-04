import { Request, Response, NextFunction } from "express";

import EStatusCode from "../../enums/EStatusCode";
import QuizzesRepository from "./QuizRepository";

import { CatchExpressError } from "../../decorators/CatchExpressErrors";
import { IQuizzesRepository } from "../../repositories/IQuizzesRepository";
import { GetQuizzesService } from "./GetQuizzesService";
import { PaginationUtils } from "../../utils/PaginationUtils";
import { GetQuizService } from "./GetQuizService";
import { DeleteQuizService } from "./DeleteQuizService";
import { UpdateQuizService } from "./UpdateQuizService";
import { InputQuizDTO } from "../../@types/InputQuizDTO";
import { CreateQuizService } from "./CreateQuizService";
import { OutputUserDTO } from "../../@types/OutputUserDTO";
import { InputQuizAnswerDTO } from "../../@types/InputQuizAnswerDTO";
import { AnswerQuizService } from "./AnswerQuizService";
import { GetQuizAnswerService } from "./GetQuizAnswerService";
import { DeleteQuizAnswerService } from "./DeleteQuizAnswerService";

export class QuizController {
  constructor(private quizzesRepository: IQuizzesRepository) {}

  @CatchExpressError
  async createQuiz(req: Request, res: Response, _next: NextFunction) {
    const input: InputQuizDTO = req.body;
    const createQuizService = new CreateQuizService(this.quizzesRepository);

    const user: OutputUserDTO = req.app.locals.user;
    const userId = user._id.toString();

    input.author = userId;
    input.questionsCount = input.questions.length;
    const quiz = await createQuizService.execute(input);

    return res.status(EStatusCode.CREATED).json({
      status: "success",
      data: quiz,
    });
  }

  @CatchExpressError
  async getUserQuizzes(req: Request, res: Response, _next: NextFunction) {
    const limit = Number(req.query.limit) || 0;
    const offset = Number(req.query.offset) || 0;
    const getQuizzesService = new GetQuizzesService(this.quizzesRepository);
    const userId = req.app.locals.user._id.toString();

    const { quizzes, quizzesCount } = await getQuizzesService.execute(
      limit,
      offset,
      { ...req.query, author: userId, deleted: false }
    );

    const offsets = PaginationUtils.calculateOffsets(limit, quizzesCount);

    return res.status(EStatusCode.OK).json({
      status: "success",
      results: quizzes.length,
      limit: limit || quizzesCount,
      offset,
      offsets,
      data: quizzes,
    });
  }

  @CatchExpressError
  async deleteQuiz(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;

    const deleteQuizService = new DeleteQuizService(this.quizzesRepository);
    const quiz = await deleteQuizService.execute(id);

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "success",
      data: quiz,
    });
  }

  @CatchExpressError
  async updateQuiz(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const input: Partial<InputQuizDTO> = req.body;

    const updateQuizService = new UpdateQuizService(this.quizzesRepository);
    const ipdatedQuiz = await updateQuizService.execute(id, input);

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "success",
      data: ipdatedQuiz,
    });
  }

  @CatchExpressError
  async getQuiz(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const query = req.query;
    const getQuizService = new GetQuizService(this.quizzesRepository);

    const quiz = await getQuizService.execute(query, {
      _id: id,
      deleted: false,
    });

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: quiz,
    });
  }

  @CatchExpressError
  async getUserQuiz(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const query = req.query;
    const getQuizService = new GetQuizService(this.quizzesRepository);
    const userId = req.app.locals.user._id.toString();

    const quiz = await getQuizService.execute(query, {
      _id: id,
      author: userId,
      deleted: false,
    });

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: quiz,
    });
  }

  @CatchExpressError
  async getCommunityQuizzes(req: Request, res: Response, _next: NextFunction) {
    const limit = Number(req.query.limit) || 0;
    const offset = Number(req.query.offset) || 0;
    const getQuizzesService = new GetQuizzesService(this.quizzesRepository);
    const { quizzes, quizzesCount } = await getQuizzesService.execute(
      limit,
      offset,
      { ...req.query, published: true, deleted: false }
    );

    const offsets = PaginationUtils.calculateOffsets(limit, quizzesCount);

    return res.status(EStatusCode.OK).json({
      status: "success",
      results: quizzes.length,
      limit: limit || quizzesCount,
      offset,
      offsets,
      data: quizzes,
    });
  }

  @CatchExpressError
  async answerQuiz(req: Request, res: Response, _next: NextFunction) {
    const input: InputQuizAnswerDTO = req.body;
    const answerQuizService = new AnswerQuizService(this.quizzesRepository);

    const user: OutputUserDTO = req.app.locals.user;
    const userId = user._id.toString();
    input.userId = userId;

    const quizAnswer = await answerQuizService.execute(input);

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: quizAnswer,
    });
  }

  @CatchExpressError
  async getQuizAnswer(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const getQuizAnswer = new GetQuizAnswerService(this.quizzesRepository);

    const user: OutputUserDTO = req.app.locals.user;
    const userId = user._id.toString();

    const quizAnswer = await getQuizAnswer.execute({ userId, _id: id });

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: quizAnswer,
    });
  }

  @CatchExpressError
  async getQuizAnswers(req: Request, res: Response, _next: NextFunction) {
    const { quizId } = req.params;
    const getQuizAnswerService = new GetQuizAnswerService(
      this.quizzesRepository
    );

    const user: OutputUserDTO = req.app.locals.user;
    const userId = user._id.toString();

    const quizAnswer = await getQuizAnswerService.execute({
      userId,
      quiz: quizId,
    });

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: quizAnswer,
    });
  }

  @CatchExpressError
  async getQuizzesAnswers(req: Request, res: Response, _next: NextFunction) {
    const getQuizAnswerService = new GetQuizAnswerService(
      this.quizzesRepository
    );

    const user: OutputUserDTO = req.app.locals.user;
    const userId = user._id.toString();

    const quizAnswer = await getQuizAnswerService.execute({ userId });

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: quizAnswer,
    });
  }

  @CatchExpressError
  async deleteQuizAnswer(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const deleteQuizAnswerService = new DeleteQuizAnswerService(
      this.quizzesRepository
    );

    const user: OutputUserDTO = req.app.locals.user;
    const userId = user._id.toString();

    const deletedQuizAnswer = await deleteQuizAnswerService.execute(id, userId);

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "success",
      data: deletedQuizAnswer,
    });
  }
}

export default new QuizController(QuizzesRepository);
