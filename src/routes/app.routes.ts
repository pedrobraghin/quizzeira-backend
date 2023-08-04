import { Router } from "express";
import { usersRouter } from "./users.routes";
import { emailsRouter } from "./emails.routes";
import { questionsRouter } from "./questions.routes";
import { quizzesRouter } from "./quizzes.routes";
import { flashcardsRouter } from "./flashcards.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/email", emailsRouter);
router.use("/questions", questionsRouter);
router.use("/quizzes", quizzesRouter);
router.use("/flashcards", flashcardsRouter);

export default router;
