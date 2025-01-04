import { ChangeEventHandler, useState } from "react";
import { Link } from "lucide-react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface InputProps {
  placeholder: string;
  type: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Input = ({ placeholder, type }: InputProps) => {
  const [url, setUrl] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const navigate = useNavigate();

  
  const handleUrlChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUrl(e.target.value);
  };
  
  const handleSubmit = async () => {
    if (!url) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError(null); 
    
    try {
      const result = await axios.post(
        "http://localhost:7000/api/scrape",
        { url },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      const results = result.data; 

      if(results){
        navigate("/results");
      }
      setResponse(JSON.stringify(results, null, 2));
      console.log(results);
      
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "There was an error with the request. Please try again.");
      } else {
        setError("There was an error with the request. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative">
      <div className="md:flex md:rounded-[12px] w-[300px] border border-[#262626] p-[5px] flex-col md:relative h-[40px]">
        <div className="flex gap-1 ml-[10px] rounded-md text-left justify-start">
          <Link className="w-[15px]" />
          <input
            className="border-none outline-none w-full bg-transparent md:text-[0.7rem] items-center text-[0.8rem]"
            type={type}
            placeholder={placeholder}
            value={url.toLowerCase()}
            onChange={handleUrlChange}
            required
          />
        </div>
      </div>

      <Button
        tag={loading ? "Analyzing..." : "Analyze"}
        onClick={handleSubmit} 
        className="md:absolute md:mt-0 mt-[20px] rounded-md md:rounded-[12px] h-[35px] w-full md:w-[80px] md:top-[5px] right-[5px]"
        disabled={loading} 
      />

      {error && <div className="text-red-500 mt-2 text-[0.6rem] text-center">{error}</div>} 
      {response && !loading && (
        <div className="mt-4 text-green-500">
        </div>
      )}
      {loading && (
        <div className="absolute top-0 left-0 right-0 m-auto bottom-0 backdrop-blur-2xl bg-transparent flex flex-col"></div>
      )}
    </section>
  );
};
