import { InputEmailTemplate } from "../../@types/InputEmailTemplate";
import { OutputEmailTemplate } from "../../@types/OutputEmailTemplate";
import { EmailTemplateSchema } from "../../schemas/EmailTemplateSchema";
import { IEmailTemplatesRepository } from "../IEmailTemplatesRepository";

export class MongoEmailsTemplateRepository
  implements IEmailTemplatesRepository
{
  async createTemplate(
    input: InputEmailTemplate
  ): Promise<OutputEmailTemplate> {
    const template = await EmailTemplateSchema.create(input);
    return template;
  }

  async getTemplate(templateName: string): Promise<OutputEmailTemplate> {
    const template = await EmailTemplateSchema.findOne({ templateName });
    return template!;
  }
}
