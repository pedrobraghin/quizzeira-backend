import z from "zod";

export const createQuizSchemaValidator = z.object({
  title: z.string().nonempty("A quiz must have a title"),
  category: z.string().nonempty("A quiz must have a category"),
  questionsCount: z.number().min(3),
  questions: z
    .array(z.string())
    .min(3)
    .nonempty("Questions must have at least 3 questions"),
  img: z
    .object({
      altText: z.string().optional(),
      src: z.string().nonempty("A img URL must be provided"),
    })
    .optional(),
  author: z.string().nonempty("A quiz must have a author"),
  published: z.boolean().optional(),
});

export const updateQuizSchemaValidator = createQuizSchemaValidator.partial();

export const queryQuizValidator = z.object({
  _id: z.string().optional(),
  category: z.string().optional(),
  title: z.string().optional(),
  author: z.string().optional(),
  deleted: z.boolean().optional(),
  published: z.boolean().optional(),
});
