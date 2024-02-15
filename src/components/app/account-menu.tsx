import { Building, ChevronDown, LogOut } from 'lucide-react'

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
  return (
    <DropdownMenu>
      {/* Conteúdo inicial visível do Dropdown */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          Pizza Shop
          <ChevronDown className="h4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      {/* Conteúdo interno do Dropdown */}
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span className="font-normal">Hilquias Ferreira Melo</span>
          <span className="text-xs font-normal text-muted-foreground">
            hilquiasfmelo@hotmail.com
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Building className="mr-2 h-4 w-4" />
          <span>Perfil da loja</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-rose-500 dark:text-rose-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
