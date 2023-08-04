import { Alternative, InputQuestionDTO } from "./InputQuestionDTO";

export interface AlternativeOutput extends Alternative {
  _id: string;
}

export interface OutputQuestionDTO extends InputQuestionDTO {
  _id: string;
  deleted?: boolean;
  multiAnswer?: boolean;
  alternatives: Array<AlternativeOutput>;
  createdAt: string;
  updatedAt: string;
}
