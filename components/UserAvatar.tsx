import { useUser } from '@clerk/nextjs'
import { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface UserAvatarProps {}

const UserAvatar: FC<UserAvatarProps> = ({}) => {
  const { user } = useUser()

  return (
    <Avatar className='w-10 h-10'>
      <AvatarImage src={user?.profileImageUrl} />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
