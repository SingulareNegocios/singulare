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
import { aboutUsType } from '@/types/aboutUs'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationAboutUsProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationAboutUs({
  id,
  children,
}: DialogInformationAboutUsProps) {
  const [aboutUs, setAboutUs] = useState<aboutUsType | null>(null)
  const [open, setOpen] = useState<boolean>()
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
    }
  }, [open, id, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do sobre nós</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do sobre nós abaixo.
          </DialogDescription>
        </DialogHeader>
        {aboutUs ? (
          <FormFieldsAboutUs aboutUs={aboutUs} readOnly />
        ) : (
          <FormFieldsAboutUs readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}