import z from "zod";

export const createQuestionSchemaValidator = z.object({
  title: z.string().nonempty("A question must have a title"),
  alternatives: z
    .array(
      z.object({
        content: z.string().nonempty("A alternative must not be empty"),
        isCorrect: z.boolean(),
      })
    )
    .min(2)
    .max(5)
    .nonempty("Alternatives must not be empty")
    .refine(
      (alternatives) => {
        let validAlternatives = true;

        validAlternatives =
          validAlternatives &&
          alternatives.some((alternative) => alternative.isCorrect);

        validAlternatives =
          validAlternatives &&
          !alternatives.every((alternative) => alternative.isCorrect);

        return validAlternatives;
      },
      { message: "At least one alternative must be correct, but not all" }
    ),
  category: z
    .string()
    .nonempty()
    .min(2, "A category name must have at least two characters"),
  author: z.string().nonempty("Author must be provided"),
  difficulty: z.number().min(1).max(3),
  published: z.boolean().optional(),
});

export const updateQuestionSchemaValidator = z
  .object({
    title: z.string().nonempty("A question must have a title"),
    alternatives: z
      .array(
        z.object({
          content: z.string().nonempty("A alternative must not be empty"),
        })
      )
      .min(2)
      .max(5)
      .nonempty(),
    category: z
      .string()
      .nonempty()
      .min(2, "A category name must have at least two characters"),
    difficulty: z.number().min(1).max(3),
    published: z.boolean().optional(),
  })
  .partial();

export const queryQuestionValidator = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
});
