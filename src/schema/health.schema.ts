import z from "zod";

export const healthSchema = z.object({
  type: z.string().min(3),
  value: z.string().min(3),
  unit : z.string().min(3),
  note: z.string().min(3),
})

export type HealthSchema = z.infer<typeof healthSchema>
