import z from "zod";

const createUserSchema = z.object({
  email: z.string().email().nonempty("A email is required"),
  name: z.object({
    first: z
      .string()
      .min(2, "First name must have at least 2 characters")
      .nonempty("A first name must be provided"),
    last: z
      .string()
      .min(2, "Last name must have at least 2 characters")
      .nonempty("A first name must be provided"),
  }),
  nickname: z
    .string()
    .min(5, "Nickname must have at least 5 characters")
    .nonempty("A nickname must be provided"),
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .nonempty("A password must be provided"),
  passwordConfirm: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .nonempty("A password must be provided"),
});
export const createUserSchemaValidator = createUserSchema.refine(
  (schema) => {
    console.log(schema.password === schema.passwordConfirm);
    return !(schema.password !== schema.passwordConfirm);
  },
  { message: "Passwords do not match" }
);

export const updateUserSchemaValidator = z.object({
  email: z.string().email().optional(),
  name: z.object({
    first: z
      .string()
      .min(2, "First name must have at least 2 characters")
      .optional(),
    last: z
      .string()
      .min(2, "Last name must have at least 2 characters")
      .optional(),
  }),
  nickname: z
    .string()
    .min(5, "Nickname must have at least 5 characters")
    .optional(),
});
