import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

interface ButtonProps {
    tag: string
    type: ButtonHTMLAttributes<HTMLButtonElement>
}

export const Button = ({ tag, type }: ButtonProps) => {
    return(
        <div>
            <button type={type}>{tag}</button>
        </div>
    )
}