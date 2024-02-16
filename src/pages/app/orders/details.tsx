import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="font-medium">
          Pedido: skdjs584s5d4s5
        </DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Primeira tabela dos dados */}
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex place-items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    Pendente
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                Hilquias Ferreira Melo
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                (98) 98329-1170
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                hilquiasfmelo@hotmail.com
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Realizado há
              </TableCell>
              <TableCell className="flex justify-end">4 minutos</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Segunda tabela dos valores */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Sub-Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 4 }).map((_, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    Pizza de Calabreza Família
                  </TableCell>
                  <TableCell className="text-right">02</TableCell>
                  <TableCell className="text-right">R$ 40,00</TableCell>
                  <TableCell className="text-right">R$ 80,00</TableCell>
                </TableRow>
              )
            })}
          </TableBody>

          <TableFooter>
            <TableRow className="font-semibold">
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell className="text-right">R$ 240,00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  )
}
