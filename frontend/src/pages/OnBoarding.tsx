import { Input } from "../components/Input";
import { Footer } from "../components/Footer";
import HirePercentage from "../components/HirePercentage";
import People from "../components/People";

const OnBoarding = () => {
    return (
      <section className="flex flex-col text-white items-center justify-center h-screen z-50">
        <span className="text-gray-400 text-[0.9rem] pb-[15px] pt-[60px]">Analyze your portfolio</span>
        <div className="relative z-50">
        <h1 className="font-md text-[3.5rem] text-center">Make it <span className="hero_text">hireable</span></h1>
        <span className="absolute bg-[#2FB6FF] blur-md w-[230px] rounded-[15px] h-[20px] bottom-[25px] md:right-0 md:m-0 left-0 m-auto right-0 z-0"></span>
        </div>
        <p className="pb-[50px] text-gray-400 text-[0.9rem]">Let's analyze and improve your portfolio in one click</p>
        <Input placeholder={"Paste your link here"} type={"text"} />
        <People />
        <HirePercentage />
        <Footer />
      </section>
    )
  }
  
  export default OnBoarding;