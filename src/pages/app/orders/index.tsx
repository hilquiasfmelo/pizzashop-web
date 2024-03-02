import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { gerOrders } from '@/api/get-orders'
import { Pagination } from '@/components/app/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableFilters } from './table-filters'
import { OrderTableRow } from './table-row'

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  // coerce => busca algo e tenta converter em um número
  const pageIndex = z.coerce
    .number()
    // pega o valor da página e remove um
    .transform((page) => page - 1)
    // se tiver page na url retorne 1 senão, não retorna nada
    .parse(searchParams.get('page') ?? '1')

  // Busca os dados da API
  const { data: result } = useQuery({
    /*
      Toda vez que a função o queryFn precisar de um parâmetro, 
      devemos adicioná-lo na queryKey para que as alterações
      reflitam em todas as páginas que usam a mesma queryKey
    */
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    // Quando recebemos parâmentros dentro da função chamamos ela dessa forma no queryFn
    queryFn: () =>
      gerOrders({
        pageIndex,
        orderId,
        customerName,
        status: status === 'all' ? null : status,
      }),
  })

  function handlePaginate(pageIndex: number) {
    // prev => significa o que já temos na URL
    setSearchParams((prevUrl) => {
      prevUrl.set('page', String(pageIndex + 1))

      return prevUrl
    })
  }

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              {/* Cabeçalho da tabela */}
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identicador</TableHead>
                  <TableHead className="w-[180px] text-center">
                    Realizado há
                  </TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {result &&
                  result.orders.map((order) => {
                    return <OrderTableRow key={order.orderId} order={order} />
                  })}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
            />
          )}
        </div>
      </div>
    </>
  )
}
