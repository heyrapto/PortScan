import { useState, useEffect } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Section } from "../components/Section";
import { useNavigate } from "react-router-dom";
import { HowItWorks } from "../components/HowItWorks";

const OnBoarding = () => {
  const [ url, setUrl ] = useState<string>("");
  const [isAnalyzing, showIsAnalyzing] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try{
      const response = await fetch('localhost:7000/api/scrape', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ url: url })
      });
      const data = await response.json();
      console.log(data);
    } catch(err){
      console.error('Error scrapping Portfolio', err);
    }
    if(url){
      showIsAnalyzing(true)
    } else {
        setErrMessage(true);
    }
    console.log(url)
  }
    return(
      <section className="flex flex-col items-center justify-center relative m-auto" onClick={() => showIsAnalyzing(false)}>
        <div className="h-screen w-full flex flex-col items-center justify-center">
        <h1 className="text-[4rem] font-bold">Make your Portfolio <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-700 to-blue-500">Hireable!</span> </h1>
        <p className="text-[1.5rem] mb-[50px]">Let's analyze and improve your portfolio in one click.</p>
        <form onSubmit={handleSubmit}>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder={"eg. raptomi.com"} type={"text"} label={"Make your Portfolio Hireable!"} />
          <p className="text-red-500 text-[0.7rem] pb-[10px] pt-[5px]">{errMessage ? "Please input a Valid Portfolio Url" : ""}</p>
        <Button tag={"submit"} className="mt-[15px]"/>
        </form>
        </div>
        <Section>
        <HowItWorks />
        <Footer />
        </Section>

        {isAnalyzing && (
          <div className={`h-screen absolute top-0 left-0 right-0 m-auto flex flex-col items-center justify-center backdrop-blur-lg cursor-pointer ${isAnalyzing ? "w-full" : "w-0 overflow-hidden"} duration-300 ease-in-out`}>
            <div className="mt-[200px] m-auto flex flex-col items-center justify-center bg-white w-[400px] h-[30vh] rounded-md shadow-md border cursor-default">
              <img />
              <div className="flex flex-col text-center items-center">
              <p className="text-[1.3rem] font-bold">Analyzing Portfolio...</p>
              <p className="text-[1rem]">Please wait! this might take a sec.</p>
              </div>
            </div>
          </div>
        )}
      </section>
    )
  }
  
  export default OnBoarding;