import { ChangeEventHandler } from "react"
import { Link } from "lucide-react"; 

interface InputProps {
    label?: string
    value?: string
    placeholder: string
    type: string
    onChange?: ChangeEventHandler<HTMLInputElement>
}
export const Input = ({ label, onChange, value, placeholder, type }:InputProps ) => {
    return(
        <div className="flex flex-col">
        <label htmlFor="input">{label}</label>
        <div className="flex">
        <Link />
        <input className="" type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
        </div>
    )
}