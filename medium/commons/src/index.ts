import {z} from "zod";

export const signUpInput = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email(),
    password: z.string().min(6),
})

export const signInInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const createBlogInput = z.object({
    title: z.string().min(1),
    content: z.string().min(6),
    thumbnail: z.string().url(),
    author: z.string().min(1),
})

export const updateBlogInput = z.object({
    id: z.string(),
    title: z.string().min(1),
    content: z.string().min(6),
    thumbnail: z.string().url(),
})

export type ZodSignUp = z.infer<typeof signUpInput>
export type ZodSignIn = z.infer<typeof signInInput>
export type ZodCreateBlog = z.infer<typeof createBlogInput>
export type ZodUpdateBlog = z.infer<typeof updateBlogInput>