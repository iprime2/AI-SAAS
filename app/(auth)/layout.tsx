import { FC } from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='flex items-center justify-center h-full bg-black/90'>
      {children}
    </div>
  )
}

export default AuthLayout
