import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFiltersType = z.infer<typeof orderFiltersSchema>

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } = useForm<OrderFiltersType>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      orderId: orderId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all',
    },
  })

  function handleOrderFilters({
    orderId,
    customerName,
    status,
  }: OrderFiltersType) {
    setSearchParams((stateUrl) => {
      if (orderId) {
        stateUrl.set('orderId', orderId)
      } else {
        stateUrl.delete('orderId')
      }

      if (customerName) {
        stateUrl.set('customerName', customerName)
      } else {
        stateUrl.delete('customerName')
      }

      if (status) {
        stateUrl.set('status', status)
      } else {
        stateUrl.delete('status')
      }

      stateUrl.set('page', '1')

      return stateUrl
    })
  }

  function handleClearFilters() {
    setSearchParams((stateUrl) => {
      stateUrl.delete('orderId')
      stateUrl.delete('customerName')
      stateUrl.delete('status')

      stateUrl.set('page', '1')

      return stateUrl
    })

    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleOrderFilters)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="ID do cliente"
        className="h-8 w-auto"
        {...register('orderId')}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register('customerName')}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              {/* Botão que vai abrir o select */}
              <SelectTrigger className="h-8 w-[180px]">
                {/* Componente que mostra o valor selecionado */}
                <SelectValue />
              </SelectTrigger>

              {/* Conteúdo do select */}
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        onClick={handleClearFilters}
        type="button"
        variant="outline"
        size="xs"
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
