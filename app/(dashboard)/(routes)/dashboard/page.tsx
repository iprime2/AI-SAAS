import { FC } from 'react'

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold'>
          Explore the power of AI
        </h2>
        <p className='text-muted-foreground'>
          Chat White the smartest AI - Experience the power of AI
        </p>
      </div>
    </div>
  )
}

export default Dashboard
