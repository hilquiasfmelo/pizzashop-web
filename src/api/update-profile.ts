import { API } from '@/lib/axios'

interface UpdateProfileBody {
  name: string
  description: string
}

export async function updateProfile({ name, description }: UpdateProfileBody) {
  await API.put('/profile', {
    name,
    description,
  })
}
