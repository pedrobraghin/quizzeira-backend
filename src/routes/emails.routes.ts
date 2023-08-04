import { Router } from "express";

import EAccessLevel from "../enums/EAccessLevel";
import EmailTemplateController from "../modules/emailTemplate/EmailTemplateController";

import { auth } from "../middlewares/auth";

const templateRouter = Router();

templateRouter.get("/:templateName", EmailTemplateController.getTemplate);
templateRouter.post("/", EmailTemplateController.createTemplate);
templateRouter.delete("/:templateName", EmailTemplateController.deleteTemplate);

const emailsRouter = Router();

emailsRouter.use(auth(EAccessLevel.ADMIN_ACCESS));
emailsRouter.use("/templates", templateRouter);

export { emailsRouter };
