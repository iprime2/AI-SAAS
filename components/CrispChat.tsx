'use client'

import { FC, useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

interface CrispChatProps {}

const CrispChat: FC<CrispChatProps> = ({}) => {
  useEffect(() => {
    Crisp.configure('61f6dd2d-bf12-4eeb-b779-9c44ec6b9b75')
  }, [])
  return <div>CrispChat</div>
}

export default CrispChat
