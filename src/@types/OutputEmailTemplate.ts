import { InputEmailTemplate } from "./InputEmailTemplate";

export interface OutputEmailTemplate extends InputEmailTemplate {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
