'use client'
import Image from "next/image"
import navLogo from "@/public/audiophile 2.svg"
import NavLink from "./NavLink"
import Cart from "../buttons/Cart"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import CategoriesGroup from "../groups/CategoriesGroup"

const Navbar = () => {
  const pathName: string = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close mobile menu when navigating
  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

    useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        setIsMobileMenuOpen(false)
      }
    }

    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])


  return (
    <>
      <div className={`w-full ${isMobileMenuOpen ? 'bg-black fixed' : 'bg-transparent absolute'} px-8 z-500 ${pathName === '/' && !isMobileMenuOpen ? 'bg-transparent' : 'bg-black'}`}>
        <div className="content-wrapper">
          <nav className='py-8 flex items-center justify-between top-menu'>
            <div className="flex items-center md:justify-left justify-between md:gap-10.5 w-full md:w-fit cursor-pointer">
              
              {/* Hamburger menu - Now properly toggles */}
              <button 
                onClick={toggleMobileMenu}
                className="lg:hidden flex flex-col gap-0.75 p-2"
                aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              >
                <span className="w-4 h-0.75 bg-white transition-all"></span>
                <span className="w-4 h-0.75 bg-white transition-all"></span>
                <span className="w-4 h-0.75 bg-white transition-all"></span>
              </button>

              <Link href={'/'} onClick={handleNavClick}>
                <Image src={navLogo} alt='logo'/>
              </Link>
              
              <Cart
                extraClass={'md:hidden inline'}
              />
            </div>
            
            <div className="lg:flex gap-8.5 -ml-16 hidden">
              <NavLink
                linkTo={'/'}
                linkName={'home'}
              />
              <NavLink
                linkTo={'/category/headphones'}
                linkName={'headphones'}
              />
              <NavLink
                linkTo={'/category/speakers'}
                linkName={'speakers'}
              />
              <NavLink
                linkTo={'/category/earphones'}
                linkName={'earphones'}
              />
            </div>
            <Cart
              extraClass={'hidden md:inline'}
            />
          </nav>
        </div>

      </div>

       {/* Mobile Menu Sidebar - Now properly toggles with hamburger */}
        <div className={`fixed pt-25 top-0 left-0 h-full bg-[#00000066] w-full lg:hidden z-4 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-[120%]'
        }`}>
          
          {/* Mobile Navigation Links */}
          <div className="rounded-lg bg-white px-6 pb-9 pt-6 space-y-12 flex flex-col overflow-y-auto h-[80vh] md:h-fit" onClick={handleNavClick}>
            <CategoriesGroup/>
          </div>
        </div>
    </>
  )
}

export default Navbar