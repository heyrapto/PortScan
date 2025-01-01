const HirePercentage = () => {
  return (
    <section className="flex flex-col gap-5 mt-[50px] items-center justify-center">
        <div className="border border-gray-600 px-[10px] w-fit rounded-full py-[5px]">
            <p className="text-gray-500 text-[0.6rem]">100% hireable</p>
        </div>
        <div className="border border-gray-600 px-[10px] w-fit rounded-full py-[5px]">
            <p className="text-gray-500 text-[0.5rem]">50% hireable</p>
        </div>
        <div className="border border-gray-600 px-[10px] w-fit rounded-full py-[5px]">
            <p className="text-gray-500 text-[0.4rem]">30% hireable</p>
        </div>
        <div className="border border-gray-600 px-[10px] w-fit rounded-full py-[5px]">
            <p className="text-gray-500 text-[0.3rem]">10% hireable</p>
        </div>
    </section>
  )
}

export default HirePercentage