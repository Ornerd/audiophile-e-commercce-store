import Link from "next/link"

const ButtonTwo = ({linkTo = '#', buttonText = 'see product'}: {linkTo?: string; buttonText : string}) => {

  return (
    <Link href={linkTo} className="w-fit border border-black py-[15px] px-[31.5px] text-[0.8125rem] cursor-pointer font-bold text-black uppercase tracking-[1px] hover:bg-black hover:text-white box-border">{buttonText}</Link>
  )
}

export default ButtonTwo