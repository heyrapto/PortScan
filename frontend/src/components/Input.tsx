import { ChangeEventHandler } from "react";
import { Link } from "lucide-react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

interface InputProps {
  placeholder: string;
  type: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

import { useScanStore } from '../store/store';

export const Input = ({ placeholder, type }: InputProps) => {
  const navigate = useNavigate();
  const {
    url,
    loading,
    error,
    result,
    setUrl,
    scanUrl
  } = useScanStore();

  const handleSubmit = async () => {
    if (!url) {
      useScanStore.setState({ error: "Please enter a valid URL" });
      return;
    }

    await scanUrl(url);
    
    if (result) {
      navigate("/results");
    }
  };

  return (
    <section className="relative">
      <div className="md:flex md:rounded-[12px] w-[300px] border border-[#262626] p-[5px] flex-col md:relative static h-[40px]">
        <div className="flex gap-1 ml-[10px] rounded-md text-left justify-start">
          <Link className="w-[15px]" />
          <input
            className="border-none outline-none w-full bg-transparent md:text-[0.7rem] items-center text-[0.8rem]"
            type={type}
            placeholder={placeholder}
            value={url.toLowerCase()}
            onChange={(e) => setUrl(e.target.value)}
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
    </section>
  );
};
