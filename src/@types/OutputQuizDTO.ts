import { InputQuizDTO } from "./InputQuizDTO";

export interface OutputQuizDTO extends InputQuizDTO {
  _id: string;
  author: String;
  deleted?: boolean;
  createdAt: String;
  updatedAt: String;
}
