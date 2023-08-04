import { OutputEmailTemplate } from "../@types/OutputEmailTemplate";
import { InputEmailTemplate } from "../@types/InputEmailTemplate";

export interface IEmailTemplatesRepository {
  createTemplate(input: InputEmailTemplate): Promise<OutputEmailTemplate>;
  getTemplate(templateName: string): Promise<OutputEmailTemplate>;
}
