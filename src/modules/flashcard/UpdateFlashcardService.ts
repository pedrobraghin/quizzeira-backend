import { InputFlashcardDTO } from "../../@types/InputFlashcardDTO";
import { NotFoundError } from "../../errors/NotFoundError";
import { IFlashcardsRepository } from "../../repositories/IFlashcardsRepository";

export class UpdateFlashcardService {
  constructor(private flashcardsRepository: IFlashcardsRepository) {}

  async execute(id: string, input: Partial<InputFlashcardDTO>) {
    const updatedFlashcard = await this.flashcardsRepository.updateFlashcard(
      id,
      input
    );

    if (!updatedFlashcard) {
      throw new NotFoundError("Flashcard not found");
    }

    return updatedFlashcard;
  }
}
