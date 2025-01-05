import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";

const Results = () => {
    return(
        <section className="flex flex-col items-center justify-center text-white gap-5">
        <Navbar />
        <div className="flex flex-col text-center items-center justify-center gap-4">
        <div className="flex flex-col gap-6 items-center justify-center text-center">
            <h1 className="text-white text-[1rem]">Your result</h1>
            <div className="flex items-center justify-center h-[170px] w-[300px] rounded-full bg-gradient-to-r from-pink-400 via-blue-600 to-pink-400 p-2 circle">
                <div className="flex flex-col w-full h-[135px] items-center justify-center bg-[#040018] rounded-full circle">
                    <p className="text-gray-500 text-[0.7rem] font-semibold">You got</p>
                 <span className="text-white bg-transparent text-[1.5rem]">100%</span>
                </div>
            </div>
        </div>
        <h1 className="text-gray-400">Solid Portfolio, you did good!</h1>
        </div>

        <div className="md:grid place-content-center grid-cols-2 gap-10 items-center justify-center px-[50px] flex flex-col mt-[20px]">
            <div className="flex flex-col">
                <h1 className="text-[1rem]">Suggestions</h1>
                <p className="pt-[15px] text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate mollitia alias hic eius deleniti architecto eaque tempore delectus! Alias magni sit veniam odit, ratione explicabo in dolorum vero non doloremque.</p>
            </div>
            <div className="flex flex-col">
                <h1>Tips</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate mollitia alias hic eius deleniti architecto eaque tempore delectus! Alias magni sit veniam odit, ratione explicabo in dolorum vero non doloremque.</p>
            </div>
            <div className="flex flex-col">
                <h1>Critiques</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate mollitia alias hic eius deleniti architecto eaque tempore delectus! Alias magni sit veniam odit, ratione explicabo in dolorum vero non doloremque.</p>
            </div>
        </div>
        <Footer />
        </section>
    )
}

export default Results;