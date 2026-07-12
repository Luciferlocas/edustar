"use client";

import { Spinner } from '@heroui/react'
import React from 'react'

const loading = () => {
  return (
    <div className='min-h-screen w-screen grid place-content-center'>
      <Spinner />
    </div>
  )
}

export default loading
