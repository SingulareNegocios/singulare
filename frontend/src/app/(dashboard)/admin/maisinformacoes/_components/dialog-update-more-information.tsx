'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'

import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType, api } from '@/services/api'
import SkeletonFormFieldsUser from './skeleton-users'
import { moreInformationType } from '@/types/more-information'
import { updateMoreInformation } from '@/actions/more-information'
import FormFieldsMoreInformation from './form-fields-more-information'

interface DialogUpdateUserProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateMoreInformation({ id, children }: DialogUpdateUserProps) {
  const [moreInformation, setMoreInformation] =
    useState<moreInformationType | null>(null)

  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)

  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<moreInformationType>(
        'GET',
        '/moreinformation',
      )

      if (response) {
        setMoreInformation(response)
      } else {
        setMoreInformation(null)
        toast({
          title: 'Informação não encontrada!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => {
      setMoreInformation(null)
      setError(null)
    }
  }, [id, open, toast])

  const submit = async (form: FormData) => {


    const { error } = await JSON.parse(
      await updateMoreInformation(form),
    )

    if (error) {
      setError(error)

      toast({
        title: 'Não foi possível editar as informações!',
      })
    } else {
      toast({
        title: 'Informações atualizadas com sucesso!',
      })

      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Mais Informações</DialogTitle>
          <DialogDescription>
            Atualize as informações abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>

        <form action={submit}>
          {moreInformation ? (
            <FormFieldsMoreInformation
              error={error}
              moreInformation={moreInformation}
            />
          ) : (
            <SkeletonFormFieldsUser />
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}