import { UpdateQuestionService } from "./UpdateQuestionService";
import { CreateQuestionService } from "./CreateQuestionService";
import { Request, Response, NextFunction } from "express";

import EStatusCode from "../../enums/EStatusCode";

import { IQuestionsRepository } from "../../repositories/IQuestionsReposiroty";
import { QuestionsRepository } from "./QuestionsRepository";
import { CatchExpressError } from "../../decorators/CatchExpressErrors";
import { GetQuestionService } from "./GetQuestionService";
import { DeleteQuestionService } from "./DeleteQuestionService";
import { GetAllQuestionsService } from "./GetAllQuestionsService";
import { InputQuestionDTO } from "../../@types/InputQuestionDTO";
import { OutputUserDTO } from "../../@types/OutputUserDTO";
import { OutputQuestionDTO } from "../../@types/OutputQuestionDTO";

export class QuestionController {
  constructor(private questionsRepository: IQuestionsRepository) {}

  @CatchExpressError
  async createQuestion(req: Request, res: Response, _next: NextFunction) {
    const input: InputQuestionDTO = req.body;
    const authorId = req.app.locals.user._id.toString();

    input.author = authorId;

    const createQuestionService = new CreateQuestionService(
      this.questionsRepository
    );
    const question = await createQuestionService.execute(input);

    return res.status(EStatusCode.CREATED).json({
      status: "success",
      data: question,
    });
  }

  @CatchExpressError
  async getQuestion(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const getQuestionService = new GetQuestionService(this.questionsRepository);
    const question = await getQuestionService.execute(req.query, {
      _id: id,
      published: true,
      deleted: false,
    });

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: question,
    });
  }

  @CatchExpressError
  async getUserQuestion(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const userId = req.app.locals.user._id.toString();
    const getQuestionService = new GetQuestionService(this.questionsRepository);
    const question = await getQuestionService.execute(req.query, {
      _id: id,
      author: userId,
      deleted: false,
    });

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: question,
    });
  }

  @CatchExpressError
  async index(req: Request, res: Response, _next: NextFunction) {
    const { category } = req.params;
    const getAllQuestionsService = new GetAllQuestionsService(
      this.questionsRepository
    );

    let query: Partial<OutputQuestionDTO> = {};

    if (category) {
      query.category = category;
    }
    const { questions, questionsCount } = await getAllQuestionsService.execute(
      query,
      {}
    );

    return res.status(EStatusCode.OK).json({
      status: "success",
      results: questions.length || questionsCount,
      data: questions,
    });
  }

  @CatchExpressError
  async getUserQuestions(req: Request, res: Response, _next: NextFunction) {
    const { category } = req.query;
    const getAllQuestionsService = new GetAllQuestionsService(
      this.questionsRepository
    );

    let query = {};

    if (category) {
      query = { category };
    }
    const user: OutputUserDTO = req.app.locals.user;
    const userId = user._id.toString();
    const { questions, questionsCount } = await getAllQuestionsService.execute(
      query,
      {
        author: userId,
        deleted: false,
      }
    );

    return res.status(EStatusCode.OK).json({
      status: "success",
      results: questions.length || questionsCount,
      data: questions,
    });
  }

  @CatchExpressError
  async getCommunityQuestions(
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const { category } = req.query;
    const getAllQuestionsService = new GetAllQuestionsService(
      this.questionsRepository
    );
    const userId: string = req.app.locals.user.id;
    let query = {};

    if (category) {
      query = { category };
    }

    const { questions, questionsCount } = await getAllQuestionsService.execute(
      query,
      {
        published: true,
        deleted: false,
        author: { $not: { $eq: userId } },
      }
    );

    return res.status(EStatusCode.OK).json({
      status: "success",
      results: questions.length || questionsCount,
      data: questions,
    });
  }

  @CatchExpressError
  async updateQuestion(req: Request, res: Response, _next: NextFunction) {
    const input: Partial<InputQuestionDTO> = req.body;
    const { id } = req.params;
    const updateQuestionService = new UpdateQuestionService(
      this.questionsRepository
    );
    const userId = req.app.locals.user._id.toString();
    const updatedQuestion = updateQuestionService.execute(id, userId, input);

    return res.status(EStatusCode.OK).json({
      staus: "success",
      data: updatedQuestion,
    });
  }

  @CatchExpressError
  async deleteQuestion(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const userId = req.app.locals.user._id.toString();
    const deleteQuestionService = new DeleteQuestionService(
      this.questionsRepository
    );
    const deletedQuestion = await deleteQuestionService.execute(id, userId);

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "success",
      data: deletedQuestion,
    });
  }
}
export default new QuestionController(QuestionsRepository);
