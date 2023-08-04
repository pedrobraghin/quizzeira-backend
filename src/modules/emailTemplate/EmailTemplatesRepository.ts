import { IEmailTemplatesRepository } from "../../repositories/IEmailTemplatesRepository";
import { MongoEmailsTemplateRepository } from "../../repositories/implementations/MongoEmailsTemplateRepository";

const EmailTemplatesRepository: IEmailTemplatesRepository =
  new MongoEmailsTemplateRepository();

export default EmailTemplatesRepository;
