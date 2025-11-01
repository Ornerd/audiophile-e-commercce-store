import Category from '../cards/Category'

const CategoriesGroup = () => {
  return (
    <div className='flex gap-7.5 flex-col items-end md:flex-row '>
        <Category
        src={'/img/headphones-category.png'}
        alt={'image'}
        categoryName={'headphones'}
        />
        <Category
        src={'/img/speakers-category.png'}
        alt={'image'}
        categoryName='speakers'
        />
        <Category
        src={'/img/earphones category.png'}
        alt={'image'}
        categoryName='earphones'
        />
    </div>
  )
}

export default CategoriesGroup