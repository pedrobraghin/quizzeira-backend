import { Request, Response, NextFunction } from "express";

import EmailTemplatesRepository from "./EmailTemplatesRepository";

import { OutputEmailTemplate } from "../../@types/OutputEmailTemplate";
import { CatchExpressError } from "../../decorators/CatchExpressErrors";
import { IEmailTemplatesRepository } from "../../repositories/IEmailTemplatesRepository";
import { CreateEmailTemplateService } from "./CreateEmailTemplateService";
import { GetEmailTemplateService } from "./GetEmailTemplateService";

export class EmailController {
  constructor(private emailTemplatesRepository: IEmailTemplatesRepository) {}

  async getEmailTemplate(templateName: string): Promise<OutputEmailTemplate> {
    const template = await this.emailTemplatesRepository.getTemplate(
      templateName
    );
    return template;
  }

  @CatchExpressError
  async getTemplate(req: Request, res: Response, _next: NextFunction) {
    const { templateName } = req.params;
    const getEmailTemplateService = new GetEmailTemplateService(
      this.emailTemplatesRepository
    );

    const template = await getEmailTemplateService.execute(templateName);

    return res.status(200).json({
      status: "success",
      data: template,
    });
  }

  @CatchExpressError
  async createTemplate(req: Request, res: Response, _next: NextFunction) {
    const { templateName, emailSubject, emailBody } = req.body;
    const createEmailTemplateService = new CreateEmailTemplateService(
      this.emailTemplatesRepository
    );
    const template = await createEmailTemplateService.execute({
      templateName,
      emailSubject,
      emailBody,
    });

    return res.status(200).json({
      status: "success",
      data: template,
    });
  }

  @CatchExpressError
  async deleteTemplate(req: Request, res: Response, _next: NextFunction) {}
}

export default new EmailController(EmailTemplatesRepository);
