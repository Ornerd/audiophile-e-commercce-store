import ButtonOne from "@/components/buttons/ButtonOne";
import ButtonTwo from "@/components/buttons/ButtonTwo";
import Image from "next/image";
import HeroImage from "@/public/img/hero-bg-piece.png"
import CategoriesGroup from "@/components/groups/CategoriesGroup";
import ButtonFour from "@/components/buttons/ButtonFour";
import speakerSetDesktop from "@/public/assets/home/desktop/image-speaker-zx7.jpg"
import speakerSetTablet from "@/public/assets/home/tablet/image-speaker-zx7.jpg"
import speakerSetMobile from "@/public/assets/home/mobile/image-speaker-zx7.jpg"
import earphoneDesktop from "@/public/assets/home/desktop/image-earphones-yx1.jpg"
import earphoneTablet from "@/public/assets/home/tablet/image-earphones-yx1.jpg"
import earphoneMobile from "@/public/assets/home/mobile/image-earphones-yx1.jpg"
import AudiophileDesc from "@/components/groups/AudiophileDesc";
import Footer from "@/components/groups/Footer";

export default function Home() {
  return (
    <main className="relative">
      <section className="max-h-[792px] bg-[#101010] min-h-7 overflow-hidden  lg:px-8">
        <div className="content-wrapper h-full flex items-center pt-56.25 pb-39.5 relative z-2">

          <div className="text-white text-center lg:text-left flex flex-col items-center lg:items-start w-full lg:fit gap-6 z-2 px-8">
            <h4 className="tracking-[10px] opacity-50 text-[0.875rem] font-normal">NEW PRODUCT</h4>
            <h1 className="uppercase leading-[100%] md:text-[3.5rem] text-4xl font-bold tracking-[2px]">XX99 Mark II  <br></br>
                HeadphoneS
            </h1>
            <p className="max-w-[349px] opacity-75 mb-4">
              Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
            </p>

            <ButtonOne
            buttonText="see product"
            linkTo="/category/headphones/xx99-mark-two-headphones"
            />
          </div>

            <div className="absolute lg:top-0 -top-6 lg:-right-16 lg:w-[708.8px] w-auto lg:h-full h-[110%] z-1 opacity-50 lg:opacity-100">
              <Image src={HeroImage} alt={'headphone'} className="object-cover h-full"/>
            </div>

        </div>
      </section>
      <div className="content-wrapper md:px-8 px-6 lg:mt-30 md:mt-24 mt-10">
          <CategoriesGroup/>
      </div>

      <section className="lg:mt-42 md:mt-24 mt-30 md:px-8 px-6">
        <div className="content-wrapper bg-[#D87D4A] rounded-lg min-h-[560px] flex lg:items-end justify-center items-center flex-col lg:flex-row lg:gap-34 gap-16 overflow-hidden relative">
            <div className="lg:w-[410px] md:w-[197.2px] w-[172.25] -mb-2 z-3 mt-13 lg:mt-0">
              <Image src={'/img/speakers-category.png'} alt={'speaker image'} width={500} height={500} className="object-cover"/>
            </div>
            <div className="text-white flex flex-col items-center lg:items-start gap-6 lg:mb-30 mb-16 z-3 text-center lg:text-left">
              <h1 className="uppercase leading-[103.5%] md:text-[3.5rem] text-4xl font-bold tracking-[2px]">zx9  <br></br>
               speaker
              </h1>
              <p className="max-w-[349px] opacity-75 mb-4 lg:px-0 md:px-1 px-6">
                Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
              </p>

              <ButtonFour
              buttonText="see product"
              linkTo="/category/speakers/zx9-speaker"
              />
            </div>

            {/* circles */}
            <div className="lg:-top-9 lg:-left-[149px] md:-top-72 -top-[121px] md:w-[944px] w-[558px] md:h-[944px] h-[558px] border border-white rounded-[50%] absolute z-1 opacity-20"></div>
             <div className="lg:top-[165px] lg:left-[52px] md:-top-[87px] -top-0.5 md:w-[542px] w-80 md:h-[542px] h-80 border border-white rounded-[50%] absolute z-1 opacity-20"></div>
            <div className="lg:top-50 lg:left-[87px] md:-top-[52px] top-[19px] md:w-[472px] w-[279px] md:h-[472px] h-[279px] border border-white rounded-[50%] absolute z-1 opacity-20"></div>
           
        </div>
      </section>

      <section className="lg:mt-10.5 md:mt-8 mt-6 md:px-8 px-6">
        <div className="content-wrapper">
          <div className="relative overflow-hidden rounded-lg">
            <picture>
              <source media="(max-width:767px)" srcSet={speakerSetMobile.src} />
              <source media="(max-width:1023px)" srcSet={speakerSetTablet.src} />           
              <img src={speakerSetDesktop.src} alt="speaker set" className="object-cover w-screen"/>
            </picture>
            <div className="absolute top-[101px] lg:left-[95px] md:left-[62px] left-6">
              <h2 className="mb-8 font-bold text-[1.75rem] tracking-[2px]">
                ZX7 SPEAKER
              </h2>
              <ButtonTwo
              buttonText= 'see product'
              linkTo='/category/speakers/zx7-speaker'
              />
            </div>
          </div>
          

        </div>        
      </section>

      <section className="lg:mt-10.5 md:mt-8 mt-6 md:px-8 px-6">
        <div className="content-wrapper flex md:gap-[11px] gap-6 items-stretch flex-col md:flex-row">
          <div className="rounded-lg overflow-hidden h-fit w-full">
              <picture>
              <source media="(max-width:767px)" srcSet={earphoneMobile.src} />
              <source media="(max-width:1023px)" srcSet={earphoneTablet.src} />           
              <img src={earphoneDesktop.src} alt="speaker set" className="object-cover w-full"/>
              </picture>
          </div>
          <div className="bg-[#F1F1F1] w-full rounded-lg md:pt-[101px] md:pl-[95px] pt-[41] pl-6 md:pb-0 pb-[41]">
              <h2 className="mb-8 font-bold text-[1.75rem] tracking-[2px]">
                YX1 EARPHONES
              </h2>
              <ButtonTwo
              buttonText="see product"
              linkTo="/category/earphones/yx1-earphones"
              />
          </div>
        </div>
      </section>

      <section className="lg:mt-50 md:my-24 my-30 mb-[133px] md:px-8 px-6">
        <AudiophileDesc/>
      </section>

    </main>
  );
}
