import { Circle } from "../components/Circle";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { main, results } from "../constants/results";

const Results = () => {
    return(
        <section className="flex flex-col items-center justify-center text-white gap-5">
        <Navbar />
        {main.map((main, index) => (
        <div className="flex flex-col text-center items-center justify-center gap-4" key={index}>
        <div className="flex flex-col gap-6 items-center justify-center text-center">
            <h1 className="text-white text-[1rem]">Your result</h1>
            <Circle percentage={100}/>
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