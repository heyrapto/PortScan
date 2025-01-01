import { ChangeEventHandler } from "react"
import { Link } from "lucide-react"; 
interface InputProps {
    label?: string
    value?: string
    placeholder: string
    type: string
    onChange?: ChangeEventHandler<HTMLInputElement>
}
export const Input = ({ onChange, value, placeholder, type }:InputProps ) => {
    return(
        <div className="flex w-[300px] py-[5px] rounded-md">
        <div className="flex gap-2">
        <Link />
        <input className="border-none outline-none w-full" type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
        </div>
    )
}