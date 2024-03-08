import { z } from "zod";

export const messageValidator = z.object({
  id: z.string(),
  sender: z.string(),
  text: z.string(),
  timestamp: z.number(),
});

export const usernameValidator = z.string().min(3, {
  message: "Username must be at least 3 characters.",
});

export const messageArrayValidator = z.array(messageValidator);

export type Message = z.infer<typeof messageValidator>;
