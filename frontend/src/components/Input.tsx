import { ChangeEventHandler } from "react"
import { Link } from "lucide-react";
import { Button } from "./Button";
interface InputProps {
    label?: string
    value?: string
    placeholder: string
    type: string
    onChange?: ChangeEventHandler<HTMLInputElement>
}
export const Input = ({ onChange, value, placeholder, type }:InputProps ) => {
    return(
        <div className="flex rounded-[12px] w-[300px] border border-[#262626] p-[5px] justify-between items-center">
        <div className="flex gap-1 ml-[10px]">
        <Link className="w-[15px]" />
        <input className="border-none outline-none w-full bg-transparent text-[0.7rem]" type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
        <Button tag={"Analyze"} className={""} />
        </div>
    )
}