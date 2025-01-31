const HirePercentage = () => {
  return (
    <section className="flex flex-col gap-5 md:mt-[50px] mt-[30px] items-center justify-center relative">
        <div className="border border-gray-600 px-[10px] w-fit rounded-full py-[5px]">
            <p className="text-gray-400 md:text-[0.9rem] text-[0.8rem]">100% hireable</p>
        </div>
        <div className="border border-gray-600 px-[10px] w-fit rounded-full py-[5px]">
            <p className="text-gray-400 md:text-[0.7rem] text-[0.7rem]">50% hireable</p>
        </div>
        <div className="border border-gray-600 px-[10px] w-fit rounded-full py-[5px]">
            <p className="text-gray-400 md:text-[0.5rem] text-[0.6rem]">30% hireable</p>
        </div>
        <div className="border border-gray-600 px-[10px] w-fit rounded-full py-[5px]">
            <p className="text-gray-500 md:text-[0.4rem] text-[0.5rem]">10% hireable</p>
        </div>
    </section>
  )
}

export default HirePercentage