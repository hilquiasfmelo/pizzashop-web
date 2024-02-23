import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  // Transforma o valor booleano da ENV em uma string com o valor 'true'
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === 'true'),
})

export const env = envSchema.parse(import.meta.env)
