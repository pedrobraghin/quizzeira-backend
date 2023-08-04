import { InputFlashcardDTO } from "../../@types/InputFlashcardDTO";
import { OutputFlashcardDTO } from "../../@types/OuputFlashcardDTO";
import { IFlashcardsRepository } from "../IFlashcardsRepository";
import { FlashcardSchema } from "../../schemas/FlashcardSchema";

export class MongoFlashcardsRepository implements IFlashcardsRepository {
  async index(): Promise<{
    flashcards: OutputFlashcardDTO[];
    flashcardsCount: number;
  }> {
    const [flashcards, flashcardsCount] = await Promise.all([
      FlashcardSchema.find(),
      FlashcardSchema.countDocuments(),
    ]);

    return { flashcards, flashcardsCount };
  }

  async updateFlashcard(
    id: string,
    input: Partial<InputFlashcardDTO>
  ): Promise<OutputFlashcardDTO | null> {
    const flashcard = await FlashcardSchema.findByIdAndUpdate(id, input, {
      new: true,
    });
    return flashcard;
  }

  async deleteFlashcard(id: string): Promise<OutputFlashcardDTO | null> {
    const deletedFlashcard = await FlashcardSchema.findByIdAndDelete(id);
    return deletedFlashcard;
  }

  async getFlashcardById(id: string): Promise<OutputFlashcardDTO | null> {
    const flashcard = await FlashcardSchema.findById(id);
    return flashcard;
  }

  async createFlashcard(input: InputFlashcardDTO): Promise<OutputFlashcardDTO> {
    const flashcard = await FlashcardSchema.create(input);
    return flashcard;
  }
}
