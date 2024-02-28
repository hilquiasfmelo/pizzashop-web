import { API } from '@/lib/axios'

export async function signOut() {
  await API.post('/signout')
}
