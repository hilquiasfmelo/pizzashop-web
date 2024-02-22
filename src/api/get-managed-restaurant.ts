import { API } from '@/lib/axios'

export interface GetManagedRestaurantResponse {
  id: string
  name: string
  description: string
  managerId: string
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getManagedRestaurant() {
  const response = await API.get<GetManagedRestaurantResponse>(
    '/managed-restaurant',
  )

  return response.data
}
