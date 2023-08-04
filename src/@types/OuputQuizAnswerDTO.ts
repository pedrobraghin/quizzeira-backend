import { InternInputQuizAnswer } from "./InternInputQuizAnswer";

export interface OuputQuizAnswerDTO extends InternInputQuizAnswer {
  _id: String;
  quiz: String;
  answeredOn: Date;
  createdAt: String;
  updatedAt: String;
}
