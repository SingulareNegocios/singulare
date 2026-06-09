'use client'

import { useEffect, useState } from 'react'
import { api } from '@/services/api'
import { moreInformationType } from '@/types/more-information'
import { useToast } from '@/components/use-toast'

export function MoreInformations() {
  const { toast } = useToast()
  const [info, setInfo] = useState<moreInformationType | null>(null)

  useEffect(() => {
    async function loadData() {
      const { response } = await api<moreInformationType>(
        'GET',
        '/moreinformation',
      )

      if (!response) {
        toast({ title: 'Não foi possível carregar as informações' })
        return
      }

      setInfo(response)
    }

    loadData()
  }, [toast])

  if (!info) return null

  return (
    <section className="w-full px-4 pt-0 pb-10 md:pb-28">
      <div className="container mx-auto">
        <h2 className="text-[26px] font-bold text-center
                md:text-3xl md:text-left
                lg:text-5xl
                text-gray-900 mb-6">
          Mais informações
        </h2>

        <div className="flex flex-col gap-4 text-center md:text-left">
          <p className="text-base md:text-xl lg:text-2xl font-bold text-gray-900">
            {info.numero_turma}ª Turma:
          </p>

          <p className="text-base md:text-xl lg:text-2xl text-gray-900">
            <span className="font-bold">Dias:</span>{' '}
            <span className="text-[#167174] font-medium">{info.dias}</span>
          </p>

          <p className="text-base md:text-xl lg:text-2xl text-gray-900">
            <span className="font-bold">Inicio:</span>{' '}
            <span className="text-[#167174] font-medium">{info.inicio}</span>
          </p>

          <p className="text-base md:text-xl lg:text-2xl text-gray-900">
            <span className="font-bold">Encerramento:</span>{' '}
            <span className="text-[#167174] font-medium">{info.encerramento}</span>
          </p>

          <p className="text-base md:text-xl lg:text-2xl text-gray-900">
            <span className="font-bold">Local:</span>{' '}
            <span className="text-[#167174] font-medium">{info.local}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
