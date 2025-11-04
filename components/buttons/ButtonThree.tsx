const ButtonThree = () => {

    let butttonThreeCTA = 'shop'

  return (
    <button className="w-fit uppercase flex items-center justify-center gap-[13.3px] text-[0.8125rem] cursor-pointer">
        <span className="leading-1 group-hover:text-[#D87D4A] font-bold">{butttonThreeCTA}</span>
        
        <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.707031 0.707153L5.70703 5.70715L0.707031 10.7072" stroke="#D87D4A" strokeWidth="2"/>
        </svg>

    </button>
  )
}

export default ButtonThree