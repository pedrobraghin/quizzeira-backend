import { Router } from "express";
import { auth } from "../middlewares/auth";

import EAccessLevel from "../enums/EAccessLevel";
import QuestionController from "../modules/question/QuestionController";

const questionsRouter = Router();

questionsRouter.use(auth(EAccessLevel.USER_ACCESS));

questionsRouter.get("/", QuestionController.getUserQuestions);

questionsRouter.get("/community", QuestionController.getCommunityQuestions);
questionsRouter.get("/my/:id", QuestionController.getUserQuestion);

questionsRouter.get("/:id", QuestionController.getQuestion);

questionsRouter.post("/", QuestionController.createQuestion);
questionsRouter.patch("/:id", QuestionController.updateQuestion);
questionsRouter.delete("/:id", QuestionController.deleteQuestion);

export { questionsRouter };
