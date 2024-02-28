import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedRestaurant,
  GetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'

import { Button } from '../ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

const storeProfileDialogSchema = z.object({
  name: z.string().min(1, 'O nome do estabelecimento é obrigatório.'),
  description: z.string(),
})

type StoreProfileDialogType = z.infer<typeof storeProfileDialogSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const { data: restaurant } = useQuery({
    queryKey: ['restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StoreProfileDialogType>({
    resolver: zodResolver(storeProfileDialogSchema),
    values: {
      name: restaurant?.name ?? '',
      description: restaurant?.description ?? '',
    },
  })

  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreProfileDialogType) {
    // Retorna a informação atual dos dados do perfil, passando a chave da query que será atualizada
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'restaurant',
    ])

    // Verifica se tem um cache existente
    if (cached) {
      // Adiciona os dados atualizados para dentro do cache que tem a chave específica
      queryClient.setQueryData<GetManagedRestaurantResponse>(['restaurant'], {
        // Significa que todo o resto das informação ficará igual e será mudada apenas o que passo abaixo disso.
        // Mantém as informações existentes e é alterado somente os campos name e description.
        ...cached,
        name,
        description,
      })
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn, isPending } = useMutation({
    mutationFn: updateProfile,
    /**
     *  variables { name, description } => retorna os dados que foram usados para atualizar o perfil
     */
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({
        name,
        description,
      })

      return { previousCached: cached }
    },
    // context => informação que conseguimos compartilhar
    onError(_error, _variables, context) {
      if (context?.previousCached) {
        updateManagedRestaurantCache(context.previousCached)
      }
    },
  })

  async function handleUpdateProfile(data: StoreProfileDialogType) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Seus dados foram atualizados com sucesso.')

      reset({
        name: '',
        description: '',
      })
    } catch {
      toast.error('Houve algum erro, tente novamente!')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu
          cliente.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input
              className="col-span-3"
              id="name"
              type="text"
              {...register('name')}
            />
            {errors.name && (
              <span className="hidden">{toast.error(errors.name.message)}</span>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              // Defini o tamanho da textArea => 5 linhas
              rows={5}
              id="description"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          {isPending ? (
            <Button variant="success" disabled={isSubmitting}>
              <Loader2 className="h4 mr-2 w-4 animate-spin" />
              Salvando
            </Button>
          ) : (
            <Button type="submit" variant="success">
              Salvar
            </Button>
          )}
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
