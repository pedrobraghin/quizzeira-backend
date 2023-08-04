import { InputFlashcardDTO } from "../../@types/InputFlashcardDTO";
import { IFlashcardsRepository } from "../../repositories/IFlashcardsRepository";

export class GetFlashcardsService {
  constructor(private flashcardsRepository: IFlashcardsRepository) {}

  async execute(
    userQuery: Partial<InputFlashcardDTO> = {},
    query: Partial<InputFlashcardDTO> = {}
  ) {
    const flashcards = await this.flashcardsRepository.index();
    return flashcards;
  }
}
