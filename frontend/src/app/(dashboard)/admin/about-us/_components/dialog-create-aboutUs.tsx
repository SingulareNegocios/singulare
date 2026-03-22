'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsAboutUs from './form-fields-aboutUs'
import { createAboutUs } from '@/actions/aboutUs'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType } from '@/services/api'

interface DialogCreateAboutUsProps {
  children: React.ReactNode
}

export function DialogCreateAboutUs({ children }: DialogCreateAboutUsProps) {
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!open) {
      setError(null)
    }
  }, [open])

  const submit = async (form: FormData) => {
    setError(null)
    const newForm = await filterFormData(form)

    const erro = await createAboutUs(newForm)
    if (erro) {
      setError(await JSON.parse(erro))
      toast({
        title: 'Não foi possível criar o sobre nós!',
      })
      return
    } else {
      toast({
        title: 'Sobre nós criado com sucesso!',
      })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar sobre nós</DialogTitle>
          <DialogDescription>
            Preencha as informações do sobre nós abaixo e clique em
            &rdquo;Salvar&rdquo; para incluí-lo no sistema.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsAboutUs error={error} />
        </form>
      </DialogContent>
    </Dialog>
  )
}