import React from 'react'
import Logo from './Logo'
import MobileMenu from './MobileMenu'

const Navbar = () => {
  return (
    <div className="w-full h-18 bg-gray-500 px-5 py-2 relative flex-between ">
      <Logo/>
      <MobileMenu/>
    </div>
  )
}

export default Navbar