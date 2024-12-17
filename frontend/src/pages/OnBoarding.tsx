import { Link } from "lucide-react"; 
import { useState, useEffect } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Section } from "../components/Section";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const [ url, setUrl ] = useState<string>("");
  const [isAnalyzing, showIsAnalyzing] = useState<boolean>(false);
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
      if(data){
        navigate("/results");
      }
      console.log(data);
    } catch(err){
      console.error('Error scrapping Portfolio', err);
    }
    showIsAnalyzing(true)
  }
    return(
      <section className="flex flex-col items-center justify-center mt-[150px] relative">
        <form onSubmit={handleSubmit}>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder={"eg. raptomi.com"} type={"text"} />
        <Button tag={"submit"} type={"submit"} />
        </form>

        <Section>
        <Footer />
        </Section>

        {isAnalyzing && (
          <div className="absolute top-[100px] left-0 flex flex-col items-center justify-center">

          </div>
        )}
      </section>
    )
  }
  
  export default OnBoarding;