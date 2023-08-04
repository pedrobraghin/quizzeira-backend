import { Router } from "express";

import FlashcardsController from "../modules/flashcard/FlashcardController";
import { auth } from "../middlewares/auth";
import EAccessLevel from "../enums/EAccessLevel";

const flashcardsRouter = Router();
flashcardsRouter.use(auth(EAccessLevel.USER_ACCESS));
flashcardsRouter.post("/", FlashcardsController.createFlashcard);
flashcardsRouter.get("/", FlashcardsController.getFlashcards);
flashcardsRouter.get("/:id", FlashcardsController.getFlashcardById);
flashcardsRouter.delete("/:id", FlashcardsController.deleteFlashcard);
flashcardsRouter.patch("/:id", FlashcardsController.updateFlashcard);

export { flashcardsRouter };
