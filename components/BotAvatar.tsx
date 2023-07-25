import { FC } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'

interface BotAvatarProps {}

const BotAvatar: FC<BotAvatarProps> = ({}) => {
  return (
    <Avatar className='w-8 h-8'>
      <AvatarImage src='/logo.png' />
    </Avatar>
  )
}

export default BotAvatar
