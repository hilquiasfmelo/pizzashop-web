import { useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { getProfile } from '@/api/get-profile'

import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Skeleton } from '../ui/skeleton'
import { StoreProfileDialog } from './store-profile-dialog'

export function AccountMenu() {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  const { data: restaurant, isLoading: isLoadingRestaurant } = useQuery({
    queryKey: ['restaurant'],
    queryFn: getManagedRestaurant,
  })

  return (
    <Dialog>
      <DropdownMenu>
        {/* Conteúdo inicial visível do Dropdown */}
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {isLoadingRestaurant ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              restaurant?.name
            )}
            <ChevronDown className="h4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        {/* Conteúdo interno do Dropdown */}
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex flex-col">
            {/* Condição para mostrar o Skeleton na tela */}
            {isLoadingProfile ? (
              <div className="w-auto space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            ) : (
              <>
                <span className="font-normal">{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem className="text-rose-600 dark:text-rose-500">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/** Componente que renderizarar o contéudo do modal */}
      <StoreProfileDialog />
    </Dialog>
  )
}
