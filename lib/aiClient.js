import OpenAI from "openai";

export const aiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
