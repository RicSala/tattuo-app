import { z } from "zod";

export const registerFormSchema = z.object({
    artisticName: z //object with two properties: value and string. both with atleast 3 letters
        .object({
            value: z.string().min(3, {
                message: "artisticName must be at least 2 characters.",
            }),
            label: z.string().min(3, {
                message: "artisticName must be at least 2 characters.",
            }),
        }),
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
    confirmPassword: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
    confirm: z.boolean(),
    role: z.string().min(2, {}),
});
