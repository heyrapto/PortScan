import { Input } from "../components/Input";
import { Footer } from "../components/Footer";
import HirePercentage from "../components/HirePercentage";
import People from "../components/People";

const OnBoarding = () => {
    return (
      <section className="flex flex-col text-white items-center justify-center h-screen z-50">
        <span className="text-gray-400 text-[0.9rem] pb-[15px] pt-[60px]">Analyze your portfolio</span>
        <div className="relative z-50">
        <h1 className="font-md md:text-[3.5rem] text-[2.5rem] text-center md:pb-0 pb-[20px]">Make it <span className="hero_text">hireable</span></h1>
        <span className="absolute bg-[#2FB6FF] md:blur-md md:w-[230px] rounded-[15px] md:h-[20px] md:bottom-[25px] md:right-0 right-0 z-0 w-[160px] h-[20px] bottom-[35px] blur-2xl"></span>
        </div>
        <p className="pb-[50px] text-gray-400 text-[0.9rem] md:w-full w-[300px] text-center">Let's analyze and improve your portfolio in one click</p>
        <Input placeholder={"Paste your link here"} type={"text"} />
        <People />
        <HirePercentage />
        <Footer />
      </section>
    )
  }
  
  export default OnBoarding;