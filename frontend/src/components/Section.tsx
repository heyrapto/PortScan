import { ReactNode } from "react"

interface SectionProps {
    children: ReactNode
}

export const Section = ({ children }: SectionProps) => {
    return(
        <section className="flex flex-col gap-6 text-center items-center justify-center">{children}</section>
    )
}