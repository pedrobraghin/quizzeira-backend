import { NotFoundError } from "../../errors/NotFoundError";
import { IFlashcardsRepository } from "../../repositories/IFlashcardsRepository";

export class GetFlashcardByIdService {
  constructor(private flashcardsRepository: IFlashcardsRepository) {}

  async execute(id: string) {
    const flashcard = await this.flashcardsRepository.getFlashcardById(id);
    if (!flashcard) {
      throw new NotFoundError("Flashcard not found");
    }

    return flashcard;
  }
}
