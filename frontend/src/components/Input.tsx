import { ChangeEventHandler, useState } from "react";
import { Link } from "lucide-react";
import { Button } from "./Button";
import axios from "axios";

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

  // Handle URL input change
  const handleUrlChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUrl(e.target.value);
  };

  // Handle form submission (send POST request)
  const handleSubmit = async () => {
    if (!url) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError(null); // Reset error state

    try {
      // Add headers to the axios request
      const result = await axios.post(
        "https://port-scan-backend.vercel.app", 
        { url },
        {
          headers: {
            "Content-Type": "application/json", // Specify the content type (JSON)
            "X-Requested-With": "XMLHttpRequest", // Optional custom header
          }
        }
      );

      // Assuming response.data contains the data you want to show
      const data = result.data; 
      setResponse(JSON.stringify(data, null, 2)); // Beautify JSON if needed
      console.log(data);
      
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        // Check if the error is from Axios, and extract the error message from the response if available
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
            value={url}
            onChange={handleUrlChange}
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
          <pre className="underline text-center">View Results</pre>
          <pre className="mt-2 text-xs">{response}</pre>
        </div>
      )}
    </section>
  );
};
