import manImgDesktop from '@/public/assets/shared/desktop/image-best-gear.jpg'
import manImgTablet from '@/public/assets/shared/tablet/image-best-gear.jpg'
import manImgMobile from '@/public/assets/shared/mobile/image-best-gear.jpg'

const AudiophileDesc = () => {
  return (
    <div className='content-wrapper flex lg:flex-row-reverse flex-col lg:gap-[125px] gap-[63px] items-center'>
        <div className="rounded-lg overflow-hidden h-fit w-full">
            <picture>
            <source media="(max-width:767px)" srcSet={manImgMobile.src} />
            <source media="(max-width:1023px)" srcSet={manImgTablet.src} />           
            <img src={manImgDesktop.src} alt="speaker set" className="object-cover w-full"/>
            </picture>
        </div>
        <div className='lg:max-w-[445px] md:max-w-[573px] text-center lg:text-left'>
            <h2 className='font-bold text-[2.5rem] uppercase leading-[1.1] mb-8'>Bringing you the <span className='text-[#D87D4A]'>best</span> audio gear</h2>
            <p className='opacity-50'>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
        </div>
    </div>
  )
}

export default AudiophileDesc