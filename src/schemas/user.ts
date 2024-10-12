import { z } from "zod";

export const UserRegisterSchema = z.object({
  fullname: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export const UserLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type UserRegister = z.infer<typeof UserRegisterSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
