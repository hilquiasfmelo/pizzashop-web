import { API } from '@/lib/axios'

export interface SignInBody {
  email: string
}

export async function signIn({ email }: SignInBody) {
  await API.post('/authenticate', {
    email,
  })
}
