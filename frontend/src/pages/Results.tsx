import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";

const Results = () => {
    const main = [
        {
            percentage: 100,
            note: "Solid Portfolio",
        }
    ]

    const results = [
        {
            title: "Suggestions",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate mollitia alias hic eius deleniti architecto eaque tempore delectus! Alias magni sit veniam odit, ratione explicabo in dolorum vero non doloremque."
        },
        {
            title: "Suggestions",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate mollitia alias hic eius deleniti architecto eaque tempore delectus! Alias magni sit veniam odit, ratione explicabo in dolorum vero non doloremque."
        },
        {
            title: "Suggestions",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate mollitia alias hic eius deleniti architecto eaque tempore delectus! Alias magni sit veniam odit, ratione explicabo in dolorum vero non doloremque."
        }
    ]
    return(
        <section className="flex flex-col items-center justify-center text-white gap-5">
        <Navbar />
        {main.map((main, index) => (
        <div className="flex flex-col text-center items-center justify-center gap-4" key={index}>
        <div className="flex flex-col gap-6 items-center justify-center text-center">
            <h1 className="text-white text-[1rem]">Your result</h1>
                <div className="flex items-center justify-center h-[170px] w-[300px] rounded-full bg-gradient-to-r from-pink-400 via-blue-600 to-pink-400 p-2 circle">
                <div className="flex flex-col w-full h-[135px] items-center justify-center bg-[#040018] rounded-full circle">
                    <p className="text-gray-500 text-[0.7rem] font-semibold">You got</p>
                 <span className="text-white bg-transparent text-[1.5rem]">{main.percentage}</span>
                </div>
            </div>
            
        </div>
        <h1 className="text-gray-400">{main.note}</h1>
        </div>
    ))}

        <div className="md:grid place-content-center grid-cols-2 gap-10 items-center justify-center px-[50px] flex flex-col mt-[20px]">
            {results.map((result, index) => (
                <div className="flex flex-col" key={index}>
                <h1 className="text-[1rem]">{result.title}</h1>
                <p className="pt-[15px] text-gray-400">{result.desc}</p>
            </div>
            ))}
        </div>
        <Footer />
        </section>
    )
}

export default Results;