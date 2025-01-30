import { Circle } from "../components/Circle";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { main } from "../constants/results";
import { useScanStore } from "../store/store";

const Results = () => {
    const { result, error, loading, url } = useScanStore();

    if (loading) return <div className="text-white">Loading scan results...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!result) return <div className="text-white">No results available</div>;

    return (
        <section className="flex flex-col items-center justify-center text-white gap-5">
            <Navbar />
            <div className="flex flex-col text-center items-center justify-center gap-4">
                <div className="flex flex-col gap-6 items-center justify-center text-center">
                    <h1 className="text-white text-[1rem]">Your result</h1>
                    <Circle percentage={result.hireablePercentage} />
                </div>
                <h1 className="text-gray-400">{main[0].note}</h1>
            </div>

            <div className="md:grid grid-cols-2 gap-10 items-start justify-center px-[50px] w-full max-w-4xl mt-[20px]">
                {result.feedback.map((category, index) => (
                    <div 
                        key={index}
                        className="bg-white/10 p-6 rounded-lg hover:bg-white/20 transition-colors"
                    >
                        <h2 className="text-xl font-bold mb-4 capitalize">
                            {category.category}
                        </h2>
                        <ul className="space-y-3">
                            {category.items.map((item, itemIndex) => (
                                <li 
                                    key={itemIndex}
                                    className="text-gray-300 text-sm p-3 bg-black/20 rounded-md"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <Footer />
        </section>
    )
}

export default Results;