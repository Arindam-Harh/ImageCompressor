import z from "zod";

//todo creating the login schema
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .toLowerCase()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email should be atleast 3 characters" })
    .max(255, { message: "Email must not be of more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password should be atleast 6 characters" })
    .max(1024, {
      message: "Password must not be of more than 1024 characters",
    }),
});

//todo creating the signup schema
export const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Username should be atleast 3 characters" })
    .max(255, { message: "Username must not be of more than 255 characters" }),
});
