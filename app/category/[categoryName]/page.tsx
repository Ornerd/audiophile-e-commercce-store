import AudiophileDesc from '@/components/groups/AudiophileDesc'
import CategoriesGroup from '@/components/groups/CategoriesGroup'
import productsData from '@/public/assets/db.json'
import ButtonOne from '@/components/buttons/ButtonOne'

// Import or read your db.json data
const getProductsByCategory = async (categoryName: string) => {
  return productsData.data.filter(product => 
    product.category.toLowerCase() === categoryName.toLowerCase())
    .sort((a, b) => {
      // New products (a.new = true) come first
      if (a.new && !b.new) return -1; // a comes first
      if (!a.new && b.new) return 1;  // b comes first
      return 0; // keep original order if both are new or both are not new
    });
}

const Category = async ({ params }: { params: Promise<{ categoryName: string }> }) => {
  const categoryName = (await params).categoryName
  const products = await getProductsByCategory(categoryName)

  return (
    <main>
        <header className='bg-black flex justify-center pt-[195px] pb-[97px]'>
            <h1 className='font-bold text-[2.5rem] text-white uppercase'>{categoryName}</h1>
        </header>

        <section>
          <div className='content-wrapper'>
              {/* products in product category goes here */}
              <div className="grid grid-cols-1 gap-32 md:gap-40 mt-32 md:mt-40 px-6 md:px-8">
                {products.map((product, index) => (
                  <div 
                    key={product.id} 
                    className={`flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-32 ${
                      index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Product Image */}
                    <div className="lg:flex-1 w-full">
                      <picture>
                        <source media="(max-width: 767px)" srcSet={`/${product.categoryImage.mobile.replace('./assets/', 'assets/')}`} />
                        <source media="(max-width: 1023px)" srcSet={`/${product.categoryImage.tablet.replace('./assets/', 'assets/')}`} />
                        <img 
                          src={`/${product.categoryImage.desktop.replace('./assets/', 'assets/')}`} 
                          alt={product.name}
                          className="w-full h-auto rounded-lg"
                        />
                      </picture>
                    </div>

                    {/* Product Info */}
                    <div className="lg:flex-1 text-center lg:text-left">
                      {product.new && (
                        <span className="text-[#D87D4A] text-sm font-normal tracking-[10px] uppercase opacity-50 mb-4 block">
                          New Product
                        </span>
                      )}
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-[1px] md:tracking-[1.43px] lg:tracking-[2px] mb-6 md:mb-8">
                        {product.name}
                      </h2>
                      <p className="text-black opacity-50 mb-6 md:mb-10 max-w-md mx-auto lg:mx-0">
                        {product.description}
                      </p>
                      <ButtonOne
                      linkTo={`/products/${product.slug}`}/>
                    </div>
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

export default Category