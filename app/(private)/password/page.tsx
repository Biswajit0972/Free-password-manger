import { FolderPlus } from '@deemlol/next-icons'
import React from 'react'

const Password = () => {
  return (
    <div className='w-full h-full relative px-5 py-1 overflow-hidden flex-column'>
      <h1 className='secondary-font text-center font-bold '>Password Store</h1>
      <div className='w-full h-[calc(100%-2rem)]   bg-gray-200 p-1 rounded-lg'>
      
      </div>
        <div className='h-15 w-15 absolute bottom-2 right-2 bg-green-500 rounded-full cursor-pointer flex-center hover:bg-green-600 transition-all duration-300 z-10'>
        <FolderPlus size={24} color="#FFFFFF" />
        </div>
    </div>
  )
}

export default Password