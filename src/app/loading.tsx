import { Spinner } from '@nextui-org/react'
import React from 'react'

const loading = () => {
  return (
    <div className='min-h-screen w-screen grid place-content-center'>
      <Spinner />
    </div>
  )
}

export default loading
