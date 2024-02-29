type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrderStatusRowProps {
  status: OrderStatus
}

// Aqui alteramos o valor da propriedade utilizando o índice da key para definir os valores
const orderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  delivered: 'Entregue',
  delivering: 'Em entrega',
  processing: 'Em preparo',
}

export function OrderStatus({ status }: OrderStatusRowProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        data-status={status}
        className="h-2 w-2 rounded-full data-[status=canceled]:bg-rose-500 data-[status=delivered]:bg-emerald-500 data-[status=delivering]:bg-amber-500 data-[status=pending]:bg-slate-400 data-[status=processing]:bg-amber-500"
      />
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  )
}
