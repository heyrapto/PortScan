export const HowItWorks = () => {
    const stepsData = [
        {
            id: 1,
            title: "Input Link",
            "desc": "when you iput, blah blah blah"
        },
        { 
            id: 2,
            title: "Input Link",
            "desc": "when you iput, blah blah blah"
        },
        { 
        id: 3,
            title: "Input Link",
            "desc": "when you iput, blah blah blah"
        },
        { 
            id: 4,
            title: "Input Link",
            "desc": "when you iput, blah blah blah"
        },
    ]
    return(
    <section className="flex flex-col text-center gap-5">
        <h1 className="font-bold text-[1.8rem]">How It Works</h1>
        <div className="flex gap-6">
            {stepsData.map((step) => (
                <div key={step.id} className="flex flex-col bg-gray-200 rounded-3xl h-[20vh] py-[20px] px-[20px] text-left w-[250px]">
                    <h1 className="font-bold pb-1 text-[1.2rem]">{step.title}</h1>
                    <p className="text-gray-600">{step.desc}</p>
                </div>
            ))}
        </div>
    </section>
    )
}