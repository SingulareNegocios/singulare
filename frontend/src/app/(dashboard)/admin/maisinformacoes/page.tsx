import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuContact  } from 'react-icons/lu'
import { Suspense } from 'react'
import { SkeletonUsers } from './_components/skeleton-users'
import ListMoreInformation from './_components/list-more-information'


export default async function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuContact  />
          Mais Informações
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
           Edite e visualize mais informações.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense fallback={<SkeletonUsers />}>
          <ListMoreInformation />
        </Suspense>
      </DashboardMain>
    </>
  )
}
