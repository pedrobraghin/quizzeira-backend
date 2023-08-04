import { IFlashcardsRepository } from "../../repositories/IFlashcardsRepository";
import { MongoFlashcardsRepository } from "../../repositories/implementations/MongoFlashcardsRepository";

const FlashcardsRepository: IFlashcardsRepository =
  new MongoFlashcardsRepository();

export default FlashcardsRepository;
