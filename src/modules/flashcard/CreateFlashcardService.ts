import { InputFlashcardDTO } from "../../@types/InputFlashcardDTO";
import { IFlashcardsRepository } from "../../repositories/IFlashcardsRepository";

export class CreateFlashcardService {
  constructor(private flashcardsRepository: IFlashcardsRepository) {}

  async execute(input: InputFlashcardDTO) {
    const flashcard = await this.flashcardsRepository.createFlashcard(input);
    return flashcard;
  }
}
