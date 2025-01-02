import { ChangeEventHandler } from "react"
import { Link } from "lucide-react";
import { Button } from "./Button";
import People from "./People";
interface InputProps {
    label?: string
    value?: string
    placeholder: string
    type: string
    onChange?: ChangeEventHandler<HTMLInputElement>
}
export const Input = ({ onChange, value, placeholder, type }:InputProps ) => {
    return(
        <section className="relative">
        <div className="md:flex md:rounded-[12px] w-[300px] border border-[#262626] p-[5px] flex-col md:relative h-[40px]">
        <div className="flex gap-1 ml-[10px] rounded-md text-left justify-start">
        <Link className="w-[15px]" />
        <input className="border-none outline-none w-full bg-transparent md:text-[0.7rem] items-center text-[0.8rem]" type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
        </div>
        <Button tag={"Analyze"} className={"md:absolute md:mt-0 mt-[20px] rounded-md md:rounded-[12px] h-[35px] w-full md:w-[80px] md:top-[5px] right-[5px]"} />
        <People />
        </section>
    )
}