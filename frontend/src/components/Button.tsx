import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

interface ButtonProps {
    tag: string
    type: React.ButtonHTMLAttributes<HTMLButtonElement>
}

export const Button = ({ tag, type }: ButtonProps) => {
    return(
        <div>
            <button onSubit={onSubmit}>{tag}</button>
        </div>
    )
}