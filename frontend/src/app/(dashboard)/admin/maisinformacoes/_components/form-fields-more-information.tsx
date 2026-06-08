'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { ResponseErrorType } from '@/services/api'
import { moreInformationType } from '@/types/more-information'
import { useFormStatus } from 'react-dom'

interface FormFieldsMoreInformationProps {
  moreInformation?: moreInformationType
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsMoreInformation({
  moreInformation,
  readOnly,
  error,
}: FormFieldsMoreInformationProps) {
  const { pending } = useFormStatus()

  return (
    <>
      <FormFieldsGroup>
        {moreInformation && (
          <Input
            defaultValue={moreInformation.id}
            type="text"
            name="id"
            hidden
          />
        )}

        <FormField>
          <Label htmlFor="numero_turma" required={!moreInformation}>
            Número da turma
          </Label>
          <Input
            name="numero_turma"
            id="numero_turma"
            placeholder="Digite o número da turma"
            defaultValue={moreInformation?.numero_turma}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.numero_turma}
          />
        </FormField>

        <FormField>
          <Label htmlFor="dias">
            Dias
          </Label>
          <Input
            name="dias"
            id="dias"
            placeholder="Digite os dias do curso"
            defaultValue={moreInformation?.dias}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.dias}
          />
        </FormField>

        <FormField>
          <Label htmlFor="inicio">
            Horário de inicio do curso
          </Label>
          <Input
            name="inicio"
            id="inicio"
            placeholder="Horário de inicio"
            defaultValue={moreInformation?.inicio}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.inicio}
          />
        </FormField>

        <FormField>
          <Label htmlFor="encerramento" required={!moreInformation}>
            Horário de encerramento do curso
          </Label>
          <Input
            name="encerramento"
            id="encerramento"
            placeholder="Horário de encerramento"
            defaultValue={moreInformation?.encerramento}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.encerramento}
          />
        </FormField>

        <FormField>
          <Label htmlFor="local" required={!moreInformation}>
            Local de realização do curso
          </Label>
          <Input
            name="local"
            id="local"
            placeholder="Local de realização do curso"
            defaultValue={moreInformation?.local}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.local}
          />
        </FormField>
      </FormFieldsGroup>

      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}