import { Schema, model } from "mongoose";
import { OutputEmailTemplate } from "../@types/OutputEmailTemplate";

const emailTemplateSchema = new Schema<OutputEmailTemplate>(
  {
    templateName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    emailBody: {
      type: String,
      required: true,
    },
    emailSubject: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export const EmailTemplateSchema = model("EmailTemplate", emailTemplateSchema);
