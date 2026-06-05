import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { Button } from '@/components/button'
import { LuInfo, LuPen} from 'react-icons/lu'
import { moreInformationType } from '@/types/more-information'
import { DialogInformationMoreInformation } from './dialog-information-more-information'
import { DialogUpdateMoreInformation } from './dialog-update-more-information'

export default async function ListMoreInformation() {
  const { response } = await api<moreInformationType>(
    'GET',
    '/moreinformation',
  )

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os usuários.
      </DashboardContainer>
    )
  }

  const moreinformation: moreInformationType = response;
  return (
    <>
      
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº da Turma</TableHead>
              <TableHead>Dias</TableHead>
              <TableHead>Inicio</TableHead>
              <TableHead>Encerramento</TableHead>
              <TableHead>Local</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              <TableRow key={moreinformation.id}>
                <TableCell>
                  {moreinformation.numero_turma}
                </TableCell>
                <TableCell>{moreinformation.dias}</TableCell>
                <TableCell>{moreinformation.inicio}</TableCell>
                <TableCell>{moreinformation.encerramento}</TableCell>
                <TableCell>{moreinformation.local}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationMoreInformation  id={moreinformation.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationMoreInformation >
                  <DialogUpdateMoreInformation id={moreinformation.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateMoreInformation>
                  
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </DashboardContainer>
     
    </>
  )
}
