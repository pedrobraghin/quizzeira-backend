import { Request, Response, NextFunction } from "express";

import EStatusCode from "../../enums/EStatusCode";
import FlashcardsRepository from "./FlashcardsRepository";

import { CatchExpressError } from "../../decorators/CatchExpressErrors";
import { InputFlashcardDTO } from "../../@types/InputFlashcardDTO";
import { GetFlashcardsService } from "./GetFlashcardsService";
import { IFlashcardsRepository } from "../../repositories/IFlashcardsRepository";
import { DeleteFlashcardService } from "./DeleteFlashcardService";
import { UpdateFlashcardService } from "./UpdateFlashcardService";
import { CreateFlashcardService } from "./CreateFlashcardService";
import { GetFlashcardByIdService } from "./GetFlashcardByIdService";

export class FlashcardsController {
  constructor(private flashcardsRepository: IFlashcardsRepository) {}

  @CatchExpressError
  async createFlashcard(req: Request, res: Response, _next: NextFunction) {
    const input: InputFlashcardDTO = req.body;
    const createFlashCardService = new CreateFlashcardService(
      this.flashcardsRepository
    );
    const userId = req.app.locals.user._id.toString();
    input.author = userId;

    const flashcard = await createFlashCardService.execute(input);

    return res.status(EStatusCode.CREATED).json({
      status: "success",
      data: flashcard,
    });
  }

  @CatchExpressError
  async getFlashcardById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const getFlashcardByIdService = new GetFlashcardByIdService(
      this.flashcardsRepository
    );

    const flashcard = await getFlashcardByIdService.execute(id);
    return res.status(EStatusCode.OK).json({
      status: "success",
      data: flashcard,
    });
  }

  @CatchExpressError
  async getFlashcards(req: Request, res: Response, _next: NextFunction) {
    const getFlashcardsService = new GetFlashcardsService(
      this.flashcardsRepository
    );
    const query = req.query;
    const flashcards = await getFlashcardsService.execute(query, {});

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: flashcards,
    });
  }

  @CatchExpressError
  async deleteFlashcard(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const deleteFlashcardService = new DeleteFlashcardService(
      this.flashcardsRepository
    );

    const flashcard = await deleteFlashcardService.execute(id);

    return res.status(EStatusCode.NOT_FOUND).json({
      status: "success",
      data: flashcard,
    });
  }

  @CatchExpressError
  async updateFlashcard(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const input: InputFlashcardDTO = req.body;
    const updateFlashcardService = new UpdateFlashcardService(
      this.flashcardsRepository
    );

    const flashcard = await updateFlashcardService.execute(id, input);

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: flashcard,
    });
  }
}

export default new FlashcardsController(FlashcardsRepository);
