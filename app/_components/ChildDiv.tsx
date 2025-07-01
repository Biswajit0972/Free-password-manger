import React from 'react'

const ChildDiv = ({children}: {children?: React.ReactNode}) => {
  return (
    <div className='h-1/2  w-full relative bg-red-500'>{children}</div>
  )
}

export default ChildDiv