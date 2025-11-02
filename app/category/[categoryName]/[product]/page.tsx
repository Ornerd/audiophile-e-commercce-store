import ButtonOne from "@/components/buttons/ButtonOne"
import AudiophileDesc from "@/components/groups/AudiophileDesc"
import CategoriesGroup from "@/components/groups/CategoriesGroup"
import productsData from '@/public/assets/db.json'
import Link from 'next/link'
import { notFound } from "next/navigation"

const getProductBySlug = async (slug: string) => {
  const product = productsData.data.find(product => product.slug === slug)

  // If product not found, return null to trigger 404
  if (!product) {
    return null
  }
  
  return product
}

const getRelatedProducts = async (currentProductSlug: string, relatedSlugs: string[]) => {
  return productsData.data.filter(product => 
    relatedSlugs.includes(product.slug) && product.slug !== currentProductSlug
  )
}

const Page = async ({ params }: { params: Promise<{ categoryName: string; product: string }> }) => {
  const { categoryName, product: slug } = await params
  const product = await getProductBySlug(slug)
  
   // used to show 404 if product doesn't exist
  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(slug, product.others.map(other => other.slug))

  return (
    <main>
        <header className="bg-black min-h-[97px]"></header>
        
        <section className="mt-16 md:mt-24 lg:mt-36 px-6 md:px-8">
            <div className="content-wrapper">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-[69px] lg:gap-32">
                    {/* product image goes here */}
                    <div className="lg:w-[540px] md:min-w-[281px]">
                      <picture>
                        <source 
                          media="(max-width: 767px)" 
                          srcSet={product.image.mobile.replace('./', '/')} 
                        />
                        <source 
                          media="(max-width: 1023px)" 
                          srcSet={product.image.tablet.replace('./', '/')} 
                        />
                        <img 
                          src={product.image.desktop.replace('./', '/')} 
                          alt={product.name}
                          className="w-full h-auto rounded-lg"
                        />
                      </picture>
                    </div>

                    <div className="w-full md:max-w-[445.5px]">
                        {/* product details go here */}
                        {product.new && (
                          <span className="text-[#D87D4A] text-sm font-normal tracking-[10px] uppercase opacity-50 mb-4 block">
                            New Product
                          </span>
                        )}
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-[1px] md:tracking-[1.43px] lg:tracking-[2px] mb-8">
                          {product.name}
                        </h1>
                        <p className="text-black opacity-50 mb-6 max-w-md">
                          {product.description}
                        </p>
                        
                        {/* product price */}
                        <h4 className="text-lg font-bold tracking-[1.29px] mb-8">
                          ${product.price}
                        </h4>
                        
                        {/* small form containing number to add to cart, side by side an add to cart button */}
                        <div className="flex gap-4">
                          <div className="flex items-center bg-gray-100 px-4 py-3">
                            <button className="px-2 text-black opacity-25 hover:text-[#D87D4A] hover:opacity-100 transition-colors">-</button>
                            <span className="px-6 font-bold">1</span>
                            <button className="px-2 text-black opacity-25 hover:text-[#D87D4A] hover:opacity-100 transition-colors">+</button>
                          </div>
                          <ButtonOne
                            buttonText="add to cart"
                            linkTo="/"
                          />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="mt-24 md:mt-40 px-6 md:px-8">
            <div className="content-wrapper">
                <div className="flex flex-col lg:flex-row gap-20 md:gap-32">
                    <div className="lg:max-w-[635px]">
                        {/* product features go here */}
                        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[1px] mb-6 md:mb-8">Features</h2>
                        <div className="text-black opacity-75 space-y-6 whitespace-pre-line">
                          {product.features}
                        </div>
                    </div>
                    <div className="lg:min-w-[350px] flex flex-col md:flex-row lg:flex-col md:justify-between md:pr-[180px] lg:justify-start lg:pr-0">
                        {/* product "includes" go here */}
                        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[1px] mb-6 md:mb-8">In the Box</h2>

                        <div className="space-y-2">
                          {product.includes.map((item, index) => (
                            <div key={index} className="flex gap-6">
                              <span className="text-[#D87D4A] font-bold min-w-[30px]">{item.quantity}x</span>
                              <span className="text-black opacity-75">{item.item}</span>
                            </div>
                          ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="mt-24 md:mt-40 px-6 md:px-8">
            <div className="content-wrapper">
                {/* product images in a grid go here */}
                <div className="grid md:grid-cols-5 md:grid-rows-4 gap-5 lg:max-h-[592px] md:max-h-[368px]">
                  <div className="md:col-span-2 md:row-span-2 md:col-start-1 rounded-lg overflow-hidden">
                    <picture>
                      <source media="(max-width: 767px)" srcSet={product.gallery.first.mobile.replace('./', '/')} />
                      <source media="(max-width: 1023px)" srcSet={product.gallery.first.tablet.replace('./', '/')} />
                      <img 
                        src={product.gallery.first.desktop.replace('./', '/')} 
                        alt={`${product.name} gallery 1`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </picture>
                  </div>
                  <div className="md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-3 rounded-lg overflow-hidden">
                    <picture>
                      <source media="(max-width: 767px)" srcSet={product.gallery.second.mobile.replace('./', '/')} />
                      <source media="(max-width: 1023px)" srcSet={product.gallery.second.tablet.replace('./', '/')} />
                      <img 
                        src={product.gallery.second.desktop.replace('./', '/')} 
                        alt={`${product.name} gallery 2`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </picture>
                  </div>
                  <div className="md:col-span-3 md:row-span-4 md:col-start-3 md:rounded-lg overflow-hidden">
                    <picture>
                      <source media="(max-width: 767px)" srcSet={product.gallery.third.mobile.replace('./', '/')} />
                      <source media="(max-width: 1023px)" srcSet={product.gallery.third.tablet.replace('./', '/')} />
                      <img 
                        src={product.gallery.third.desktop.replace('./', '/')} 
                        alt={`${product.name} gallery 3`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </picture>
                  </div>
                </div>
            </div>
        </section>

        <section className="mt-24 md:mt-40 md:px-8">
            <div className="content-wrapper px-6">
                {/* "you may also like" section, with three products similar to the product in display */}
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[1px] mb-10 md:mb-16 text-center">You may also like</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-3 lg:gap-8">
                  {relatedProducts.slice(0, 3).map((relatedProduct) => (
                    <div key={relatedProduct.id} className="text-center">
                      <div className="mb-8 md:mb-10 rounded-lg overflow-hidden">
                        <picture>
                          <source media="(max-width: 767px)" srcSet={relatedProduct.image.mobile.replace('./', '/')} />
                          <source media="(max-width: 1023px)" srcSet={relatedProduct.image.tablet.replace('./', '/')} />
                          <img 
                            src={relatedProduct.image.desktop.replace('./', '/')} 
                            alt={relatedProduct.name}
                            className="w-full h-auto rounded-lg"
                          />
                        </picture>
                      </div>
                      <h3 className="text-2xl font-bold uppercase tracking-[1.71px] mb-8 text-nowrap overflow-hidden">
                        {relatedProduct.name.split(' ').filter(word => word.toLowerCase() !== "headphones").join(' ')}
                      </h3>

                      <ButtonOne
                        buttonText="See Product"
                        linkTo={`/category/${relatedProduct.category}/${relatedProduct.slug}`}
                      />
                    </div>
                  ))}
                </div>
            </div>
        </section>

        <div className='content-wrapper md:px-8 px-6 lg:mt-40 md:mt-32 mt-10'>
          <CategoriesGroup/>
        </div>
       
        <section className="lg:mt-50 md:my-24 my-30 mb-[133px] md:px-8 px-6">
          <AudiophileDesc/>
        </section>
      
    </main>
  )
}

export default Page