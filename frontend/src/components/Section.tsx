interface SectionProps {
    children: JSX.Element
}

export const Section = ({ children }: SectionProps) => {
    return(
        <section className="flex flex-col gap-4">{children}</section>
    )
}