import { LogOut } from 'lucide-react'

import { DropdownMenuItem } from '../ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export function SignOutDialog() {
  return (
    <Popover>
      <PopoverTrigger>
        <DropdownMenuItem className="text-rose-600 dark:text-rose-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
        <PopoverContent>
          <h1>Teste</h1>
        </PopoverContent>
      </PopoverTrigger>
    </Popover>
  )
}
