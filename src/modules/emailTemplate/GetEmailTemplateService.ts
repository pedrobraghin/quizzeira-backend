import { NotFoundError } from "../../errors/NotFoundError";
import { IEmailTemplatesRepository } from "../../repositories/IEmailTemplatesRepository";

export class GetEmailTemplateService {
  constructor(private emailTemaplatesRepository: IEmailTemplatesRepository) {}

  async execute(templateName: string) {
    const template = await this.emailTemaplatesRepository.getTemplate(
      templateName
    );

    if (!template) {
      throw new NotFoundError("Email template not found");
    }

    return template;
  }
}
