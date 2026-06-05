'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsMoreInformation from './form-fields-more-information'

import SkeletonFormFieldsUser from './skeleton-users'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { moreInformationType } from '@/types/more-information'

interface DialogInformationUserProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationMoreInformation({
  id,
  children,
}: DialogInformationUserProps) {
  const [moreInformation, setMoreInformation] = useState<moreInformationType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<moreInformationType>('GET', '/moreinformation')

      if (response) {
        setMoreInformation(response)
      } else {
        setMoreInformation(null)
        toast({
          title: 'Usuário não encontrado!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => setMoreInformation(null)
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do usuário</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do usuário abaixo.
          </DialogDescription>
        </DialogHeader>
        {moreInformation ? (
          <FormFieldsMoreInformation moreInformation={moreInformation} readOnly />
        ) : (
          <SkeletonFormFieldsUser readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}
