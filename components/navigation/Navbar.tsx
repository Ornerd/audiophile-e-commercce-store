import Image from "next/image"
import navLogo from "@/public/audiophile 2.svg"
import NavLink from "./NavLink"
import Cart from "../buttons/Cart"


const Navbar = () => {


  return (
    <div className="w-full absolute px-8 z-100000">
        <div className="content-wrapper">
            <nav className="py-8 flex items-center justify-between top-menu">
                <div className="flex items-center md:justify-left justify-between md:gap-10.5 w-full md:w-fit cursor-pointer">
                    <div className="lg:hidden flex flex-col gap-0.75">
                        <span className="w-4 h-0.75 bg-white"></span>
                        <span className="w-4 h-0.75 bg-white"></span>
                        <span className="w-4 h-0.75 bg-white"></span>
                    </div>
                    <Image src={navLogo} alt='logo'/>
                     <Cart
                      extraClass={'md:hidden inline'}
                      />
                </div>
                
                <div className="lg:flex gap-8.5 -ml-16 hidden ">
                    <NavLink
                    linkTo={'/'}
                    linkName={'home'}
                    />
                    <NavLink
                    linkTo={'/'}
                    linkName={'headphones'}
                    />
                    <NavLink
                    linkTo={'/'}
                    linkName={'speakers'}
                    />
                    <NavLink
                    linkTo={'/'}
                    linkName={'earphones'}
                    />
                </div>
                <Cart
                extraClass={'hidden md:inline'}
                />
            </nav>
        </div>
    </div>
  )
}

export default Navbar