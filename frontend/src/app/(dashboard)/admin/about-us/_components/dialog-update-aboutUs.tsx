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
import { updateAboutUs } from '@/actions/aboutUs'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { aboutUsType } from '@/types/aboutUs'
import { ResponseErrorType, api } from '@/services/api'

interface DialogUpdateAboutUsProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateAboutUs({ id, children }: DialogUpdateAboutUsProps) {
  const [aboutUs, setAboutUs] = useState<aboutUsType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<aboutUsType>('GET', `/about-us/${id}`)

      if (response) {
        setAboutUs(response)
      } else {
        setAboutUs(null)
        toast({
          title: 'Sobre nós não encontrado!',
        })
        setOpen(false)
      }
    }

    if (open) {
      requestData()
    } else {
      setError(null)
    }
  }, [open, id, toast])

  const submit = async (form: FormData) => {
    setError(null)
    const newForm = await filterFormData(form)

    const error = await updateAboutUs(newForm)
    if (error) {
      setError(await JSON.parse(error))
      toast({
        title: 'Não foi possível editar o sobre nós!',
      })
      return
    } else {
      toast({
        title: 'Sobre nós editado com sucesso!',
      })
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar sobre nós</DialogTitle>
          <DialogDescription>
            Atualize as informações do sobre nós abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsAboutUs error={error} aboutUs={aboutUs} />
        </form>
      </DialogContent>
    </Dialog>
  )
}