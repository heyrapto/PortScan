import { useState, useEffect } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Section } from "../components/Section";
import { useNavigate } from "react-router-dom";
import { HowItWorks } from "../components/HowItWorks";
import HirePercentage from "../components/HirePercentage";
import People from "../components/People";

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
    return (
      <section className="flex flex-col text-white items-center justify-center h-screen">
        <span className="text-gray-400 text-[0.9rem] pb-[15px] pt-[60px]">Analyze your portfolio</span>
        <h1 className="font-bold text-[3.5rem]">Make it <span>Hireable</span></h1>
        <p className="pb-[50px] text-gray-400 text-[0.9rem]">Let's analyze and improve your portfolio in one click</p>
        <Input placeholder={"Paste your link here"} type={"text"} />
        <People />
        <HirePercentage />
        <Footer />
      </section>
    )
  }
  
  export default OnBoarding;