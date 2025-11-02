import Link from "next/link"

const ButtonOne = ({linkTo = '#', buttonText = 'see product'}: {linkTo?: string; buttonText : string}) => {


  return (
    <Link href={linkTo} className="w-fit py-[15px] px-[31.5px] bg-[#D87D4A] text-[0.8125rem] cursor-pointer font-bold text-white uppercase tracking-[1px] hover:bg-[#FBAF85]">{buttonText}</Link>
  )
}

export default ButtonOne