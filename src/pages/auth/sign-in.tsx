import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ChevronRight, Loader2 } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import colors from 'tailwindcss/colors'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const signInFormSchema = z.object({
  email: z.string().email('O email é obrigatório.'),
})

type SignInFormType = z.infer<typeof signInFormSchema>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: searchParams.get('email') || '',
    },
  })

  /**
   * useMutation => Quando formos fazer uma mutação.
   * Mutação => POST, PUT e DELETE
   */
  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInFormType) {
    try {
      await authenticate({
        email: data.email,
      })

      toast.success('Enviamos um link de autenticação para o seu email.', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
        actionButtonStyle: {
          background: colors.green[700],
          color: colors.white,
        },
      })

      reset({
        email: '',
      })
    } catch {
      toast.error('Credenciais inválidas.', {
        action: {
          label: 'Tentar novamente',
          onClick: () => handleSignIn(data),
        },
        actionButtonStyle: {
          background: colors.red[500],
          color: colors.white,
        },
      })
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="absolute right-8 top-8">
          <ThemeToggle />
        </div>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                id="email"
                data-error={Boolean(errors.email)}
                className="data-[error=true]:outline-red-600 data-[error=true]:focus-visible:ring-0 dark:data-[error=true]:outline-red-700"
                type="email"
                {...register('email')}
              />
              {errors.email && (
                <span className="hidden">
                  {toast.error(errors.email.message)}
                </span>
              )}
            </div>

            {!isSubmitting ? (
              <Button className="w-full" type="submit">
                Acessar painel
              </Button>
            ) : (
              <Button className="w-full " type="button" disabled={isSubmitting}>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Acessar painel
              </Button>
            )}
          </form>
          <Separator />
          <div className="flex cursor-pointer items-center justify-between rounded-sm border p-3 text-foreground hover:bg-muted-foreground/10 hover:transition-colors">
            <div className="flex flex-col justify-start gap-1">
              <span className="font-semibold tracking-tight">
                Sem estabelecimento cadastrado?
              </span>
              <Link to="/sign-up" className="text-sm text-muted-foreground">
                Cadastre-se
              </Link>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </>
  )
}
