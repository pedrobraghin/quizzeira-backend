import { InputFlashcardDTO } from "../@types/InputFlashcardDTO";
import { OutputFlashcardDTO } from "../@types/OuputFlashcardDTO";

export interface IFlashcardsRepository {
  createFlashcard(input: InputFlashcardDTO): Promise<OutputFlashcardDTO>;
  getFlashcardById(id: string): Promise<OutputFlashcardDTO | null>;
  deleteFlashcard(id: string): Promise<OutputFlashcardDTO | null>;
  index(): Promise<{
    flashcards: OutputFlashcardDTO[];
    flashcardsCount: number;
  }>;
  updateFlashcard(
    id: string,
    input: Partial<InputFlashcardDTO>
  ): Promise<OutputFlashcardDTO | null>;
}
