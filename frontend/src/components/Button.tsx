import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

interface ButtonProps {
    tag: string
    className: string
}

export const Button = ({ tag, className }: ButtonProps) => {
    return(
        <div className={`bg-gradient-to-br from-purple-700 to-blue-500 text-white flex items-center justify-center cursor-pointer hover:bg-gray-600 hover:duration-200 rounded-md ${className}`}>
            <button type="submit" className="text-[1rem] p-[8px] bg-transparent">{tag}</button>
        </div>
    )
}