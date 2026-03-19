'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { ResponseErrorType } from '@/services/api'
import { aboutUsType } from '@/types/aboutUs'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsAboutUsProps {
  aboutUs?: aboutUsType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsAboutUs({
  aboutUs,
  readOnly,
  error,
}: FormFieldsAboutUsProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()

  return (
    <>
      <FormFieldsGroup>
        {aboutUs && (
          <Input defaultValue={aboutUs.id} type="text" name="id" hidden />
        )}
        <FormField>
          <Label htmlFor="text">Título</Label>
          <Input
            name="text"
            id="text"
            placeholder="Insira o texto do sobre nós"
            defaultValue={aboutUs?.text}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.text}
          />
        </FormField>
        <FormField>
          <Label
            htmlFor="image"
            hidden={readOnly && !aboutUs?.image}
            required={!aboutUs}
          >
            Imagem
          </Label>
          <Input
            name="image"
            id="image"
            type="file"
            accept="image/*"
            disabled={pending}
            hidden={readOnly}
            onChange={(e) => handleImageChange(e, setUpdateImage)}
            error={error?.errors?.image}
          />
          <ImageForm
            className="aspect-square size-40"
            src={updateImage || aboutUs?.image}
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