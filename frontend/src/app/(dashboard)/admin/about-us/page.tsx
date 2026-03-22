import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuBookOpen } from 'react-icons/lu'
import ListAboutUs from './_components/list-aboutUs'
import { Suspense } from 'react'
import { SkeletonAboutUs } from './_components/skeleton-aboutUs'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { page, per_page: perPage, text } = searchParams

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuBookOpen />
          Sobre Nós
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Edite, visualize e exclua o sobre nós.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense fallback={<SkeletonAboutUs />}>
          <ListAboutUs
            page={Number(page)}
            perPage={Number(perPage)}
            text={text as string}
          />
        </Suspense>
      </DashboardMain>
    </>
  )
}