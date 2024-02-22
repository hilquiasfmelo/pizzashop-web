import { useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { getProfile } from '@/api/get-profile'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function AccountMenu() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  const { data: restaurant } = useQuery({
    queryKey: ['restaurant'],
    queryFn: getManagedRestaurant,
  })

  if (!profile || !restaurant) {
    return
  }

  return (
    <DropdownMenu>
      {/* Conteúdo inicial visível do Dropdown */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          {restaurant.name}
          <ChevronDown className="h4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      {/* Conteúdo interno do Dropdown */}
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span className="font-normal">{profile.name}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {profile.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Building className="mr-2 h-4 w-4" />
          <span>Perfil da loja</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-rose-600 dark:text-rose-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
