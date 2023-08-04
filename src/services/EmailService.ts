import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer, { Transporter, SentMessageInfo } from "nodemailer";

import EmailController from "../modules/emailTemplate/EmailTemplateController";

import EPlaceholders from "../enums/EPlaceholders";

import { Logger } from "./Logger";
import { transporter } from "../config/transporterConfig";
import { OutputUserDTO } from "../@types/OutputUserDTO";
import { EmailTemplateUtils } from "../utils/EmailTemplateUtils";

export class EmailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;
  private readonly EMAIL_FROM_ADDRESS = String(process.env.EMAIL_FROM_ADDRESS);
  private readonly EMAIL_FROM_NAME = String(process.env.EMAIL_FROM_NAME);

  constructor() {
    this.transporter = nodemailer.createTransport(transporter);
  }

  public async sendEmail(email: SentMessageInfo) {
    try {
      const info = await this.transporter.sendMail(email);
      return info.messageId;
    } catch (err) {
      if (err instanceof Error) {
        Logger.warn(`Fail to send email: ${err.message}`);
      }
      return null;
    }
  }

  public async sendWelcomeEmail(user: OutputUserDTO, templateName: string) {
    const template = await EmailController.getEmailTemplate(templateName);
    const fields = [
      { key: EPlaceholders.USER_NAME, value: user.name.first },
      { key: EPlaceholders.USER_EMAIL, value: user.email },
    ];

    const filledTemplate = EmailTemplateUtils.fillTemplate(template, fields);
    return await this.transporter.sendMail({
      from: {
        address: this.EMAIL_FROM_ADDRESS,
        name: this.EMAIL_FROM_NAME,
      },
      to: {
        address: user.email,
        name: user.name.first,
      },
      subject: filledTemplate.emailSubject,
      html: filledTemplate.emailBody,
    });
  }
}
