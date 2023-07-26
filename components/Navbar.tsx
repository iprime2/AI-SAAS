import { FC } from 'react'

import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './MobileSidebar'
import { getApiLimitCount } from '@/lib/api-limit'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const apiLimitCount = await getApiLimitCount()
  return (
    <div className='flex items-center p-4'>
      <MobileSidebar apiLimitCount={apiLimitCount} />
      <div className='flex w-full justify-end'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  )
}

export default Navbar
