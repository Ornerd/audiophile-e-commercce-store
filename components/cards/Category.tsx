import Image from 'next/image'
import React from 'react'
import ButtonThree from '../buttons/ButtonThree'
import Link from 'next/link';

const Category = ({src, alt, categoryName, onClick}: { src: string; alt: string; categoryName: string; onClick: () => void}) => {
  return (
    <Link href={categoryName} className='w-full group cursor-pointer'>
        <Image src={src} alt={alt} width={500} height={500} className="w-31.5 h-auto mx-auto -mb-16 select-none"/>
        
        <div className='w-full h-51 bg-[#F1F1F1] rounded-lg flex flex-col items-center justify-end gap-8 p-7.5'>
            <div className='bottom-shadow'></div>

            <div className='flex flex-col items-center gap-3.75'>
              <h3 className='uppercase font-bold tracking-[1.29px] select-none'>{categoryName}</h3>
              <ButtonThree
                onClick={onClick}
              />
            </div>
        </div>
    </Link>
  )
}

export default Category