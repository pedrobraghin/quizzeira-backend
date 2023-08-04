import EAccessLevel from "../enums/EAccessLevel";
import QuizController from "../modules/quiz/QuizController";

import { auth } from "../middlewares/auth";
import { Router } from "express";

const quizzesRouter = Router();

quizzesRouter.use(auth(EAccessLevel.USER_ACCESS));

quizzesRouter.get("/community", QuizController.getCommunityQuizzes);
quizzesRouter.get("/answer/:id", QuizController.getQuizAnswer);
quizzesRouter.get("/my/answers", QuizController.getQuizzesAnswers);
quizzesRouter.get("/my/answers/:quizId", QuizController.getQuizAnswers);

quizzesRouter.delete("/my/answers/:id", QuizController.deleteQuizAnswer);
quizzesRouter.get("/my/:id", QuizController.getUserQuiz);

quizzesRouter.get("/:id", QuizController.getQuiz);
quizzesRouter.get("/", QuizController.getUserQuizzes);

quizzesRouter.post("/", QuizController.createQuiz);
quizzesRouter.post("/answer-quiz", QuizController.answerQuiz);

quizzesRouter.patch("/:id", QuizController.updateQuiz);
quizzesRouter.delete("/:id", QuizController.deleteQuiz);

export { quizzesRouter };
