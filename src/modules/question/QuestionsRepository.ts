import { IQuestionsRepository } from "../../repositories/IQuestionsReposiroty";
import { MongoQuestionsRepository } from "../../repositories/implementations/MongoQuestionsRepository";

const QuestionsRepository: IQuestionsRepository =
  new MongoQuestionsRepository();

export { QuestionsRepository };
