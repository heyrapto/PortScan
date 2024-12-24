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
        <div className="flex flex-col bg-transparent border border-gray-600 gap-2 w-[300px] rounded-sm p-[10px] overflow-hidden">
        <div className="flex gap-2">
        <Link />
        <input className="border-none outline-none w-full" type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
        </div>
    )
}