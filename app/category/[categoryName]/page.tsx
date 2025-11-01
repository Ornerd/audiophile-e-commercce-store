import AudiophileDesc from '@/components/groups/AudiophileDesc'
import CategoriesGroup from '@/components/groups/CategoriesGroup'
import React from 'react'

const Category = async ({ params }: { params: Promise<{ categoryName: string }> }) => {
  const categoryName = (await params).categoryName

  return (
    <main>
        <header className='bg-black flex justify-center pt-[195px] pb-[97px]'>
            <h1 className='font-bold text-[2.5rem] text-white uppercase'>{categoryName}</h1>
        </header>

        <section>
          <div className='content-wrapper'>
              {/* products in product category goes here */}
          </div>
        </section>

        <div className='content-wrapper md:px-8 px-6 lg:mt-30 md:mt-24 mt-10'>
          <CategoriesGroup/>
        </div>
       
        <section className="lg:mt-50 md:my-24 my-30 mb-[133px] md:px-8 px-6">
        <AudiophileDesc/>
        </section>
        

    </main>
  )
}

export default Category