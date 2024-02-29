import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { getProfile } from '@/api/get-profile'
import { signOut } from '@/api/sing-out'

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
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const { data: restaurant, isLoading: isLoadingRestaurant } = useQuery({
    queryKey: ['restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const { mutateAsync: signOutFn } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      /**
       * replace => essa propriedade como true,
       * se o usuário clicar no botão de voltar,
       * ele não vai conseguir voltar para a página que estava
       */
      navigate('/sign-in', { replace: true })
      toast.success('Você foi deslogado com sucesso.')
    },
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
            <DropdownMenuItem className="cursor-pointer">
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            asChild
            className="text-rose-600 hover:text-rose-600 dark:text-rose-500 hover:dark:text-rose-500"
          >
            <button
              className="w-full cursor-pointer"
              onClick={() => signOutFn()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/** Componente que renderizarar o contéudo do modal */}
      <StoreProfileDialog />
    </Dialog>
  )
}
