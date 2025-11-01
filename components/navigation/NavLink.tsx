import Link from "next/link"

const NavLink = ({linkTo, linkName}: {linkTo: string; linkName: string}) => {

  return (
    <Link href={linkTo} className="uppercase tracking-[2px] hover:text-[#D87D4A] text-white text-[0.8125rem]">{linkName}</Link>
  )
}

export default NavLink