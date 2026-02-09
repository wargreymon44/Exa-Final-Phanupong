import z from 'zod';

export const registerSchema = z
  .object({
    username: z.string().min(3),
    password: z.string().min(3),
  })

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema =z.object({
  username: z.string().min(3),
  password: z.string().min(3)
})

export type Loginschema = z.infer<typeof loginSchema>
