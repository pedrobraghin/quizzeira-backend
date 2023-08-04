import { InputFlashcardDTO } from "./InputFlashcardDTO";

export interface OutputFlashcardDTO extends InputFlashcardDTO {
  id: String;
  createdAt: String;
  updatedAt: String;
}
