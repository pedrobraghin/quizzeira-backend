import { NotFoundError } from "../../errors/NotFoundError";
import { IFlashcardsRepository } from "../../repositories/IFlashcardsRepository";

export class DeleteFlashcardService {
  constructor(private flashcardsRepository: IFlashcardsRepository) {}

  async execute(id: string) {
    const deletedFlashcard = await this.flashcardsRepository.deleteFlashcard(
      id
    );

    if (!deletedFlashcard) {
      throw new NotFoundError("Flashcard not found");
    }

    return deletedFlashcard;
  }
}
