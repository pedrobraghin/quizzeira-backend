import { OutputEmailTemplate } from "../@types/OutputEmailTemplate";
import { OutputUserDTO } from "../@types/OutputUserDTO";

interface EmailTemplateField {
  key: string;
  value: string;
}

export class EmailTemplateUtils {
  static fillTemplate(
    template: OutputEmailTemplate,
    fields: EmailTemplateField[]
  ) {
    const emailBody = fields.reduce((acc, field) => {
      return acc.replace(field.key, field.value);
    }, template.emailBody);

    const emailSubject = fields.reduce((acc, field) => {
      return acc.replace(field.key, field.value);
    }, template.emailSubject);

    const filledTemplate: OutputEmailTemplate = {
      ...template,
      emailBody,
      emailSubject,
    };

    return filledTemplate;
  }
}
