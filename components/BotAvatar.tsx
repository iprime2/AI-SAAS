import { FC } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'

interface BotAvatarProps {}

const BotAvatar: FC<BotAvatarProps> = ({}) => {
  return (
    <Avatar className='w-10 h-10'>
      <AvatarImage src='/logo.png' />
    </Avatar>
  )
}

export default BotAvatar
