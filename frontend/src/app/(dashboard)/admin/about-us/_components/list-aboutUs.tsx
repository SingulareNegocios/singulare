import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import { Pagination } from '@/components/dashboard/pagination'
import {
  TabbleCellImage,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { paginationResponseType } from '@/types/pagination-response'
import { aboutUsType } from '@/types/aboutUs'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateAboutUs } from './dialog-update-aboutUs'
import { DialogInformationAboutUs } from './dialog-information-aboutUs'
import { PerPage } from '@/components/dashboard/per_page'
import { DialogCreateAboutUs } from './dialog-create-aboutUs'
import { FilterAboutUs } from './filter-aboutUs'

interface ListAboutUsProps {
  page?: number
  perPage?: number
  text?: string
}

export default async function ListAboutUs({
  page,
  perPage,
  text,
}: ListAboutUsProps) {
  const { response } = await api<paginationResponseType<aboutUsType[]>>(
    'GET',
    '/about-us',
    {
      params: {
        page,
        per_page: perPage,
        text,
      },
    },
  )

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os sobre nós.
      </DashboardContainer>
    )
  }

  const aboutUs: aboutUsType[] = response?.data

  return (
    <>
    
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Texto</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aboutUs?.map((aboutUsItem: aboutUsType) => (
              <TableRow key={aboutUsItem.id}>
                <TableCell>
                  <TabbleCellImage src={aboutUsItem.image} />
                </TableCell>

                <TableCell>{aboutUsItem.text}</TableCell>

                <TableCell className="flex justify-end gap-2">
                  <DialogInformationAboutUs id={aboutUsItem.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationAboutUs>
                  <DialogUpdateAboutUs id={aboutUsItem.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateAboutUs>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!aboutUs?.length && (
            <TableCaption> Nenhum sobre nós encontrado.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
      <DashboardContainer className="flex justify-between space-x-0 gap-y-2.5 max-sm:flex-col max-sm:items-center">
        <PerPage total={response.total} />
        <Pagination lastPage={response.last_page} />
      </DashboardContainer>
    </>
  )
}