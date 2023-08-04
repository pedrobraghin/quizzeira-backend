import { InputEmailTemplate } from "../../@types/InputEmailTemplate";
import { BadRequestError } from "../../errors/BadRequestError";
import { IEmailTemplatesRepository } from "../../repositories/IEmailTemplatesRepository";

export class CreateEmailTemplateService {
  constructor(private emailTemaplatesRepository: IEmailTemplatesRepository) {}

  async execute(input: InputEmailTemplate) {
    const template = await this.emailTemaplatesRepository.createTemplate(input);

    if (!template) {
      throw new BadRequestError("Email template already exists");
    }

    return template;
  }
}
