import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Circle } from "../components/Circle";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { main } from "../constants/results";
import { useScanStore } from "../store/store";

const Skeleton = () => (
    <div className="w-full max-w-4xl px-[50px] animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-48 bg-gray-800 rounded mb-4"></div>
        <div className="grid grid-cols-2 gap-10">
            {[...Array(2)].map((_, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg">
                    <div className="h-5 bg-gray-700 rounded w-2/3 mb-4"></div>
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-4 bg-gray-700 rounded"></div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const TypingText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState("");
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayText(text.slice(0, i));
            i++;
            if (i > text.length) clearInterval(interval);
        }, 30);
        return () => clearInterval(interval);
    }, [text]);
    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400"
        >
            {displayText}
        </motion.span>
    );
};

const Results = () => {
    const { result, error, loading } = useScanStore();

    if (loading) return <Skeleton />;
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!result) return <div className="text-white">No results available</div>;

    const feedbackCategories = [
        {
            title: "Suggestions",
            items: result.suggestions,
        },
        {
            title: "Critiques",
            items: result.critiques,
        },
        {
            title: "Best Practices",
            items: result.bestPractices,
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 120 }
        }
    };

    return (
        <section className="flex flex-col items-center justify-center text-white gap-5 p-6">
            <Navbar />
            <div className="flex flex-col text-center items-center justify-center gap-4">
                <div className="flex flex-col gap-6 items-center justify-center text-center">
                    <h1 className="text-white text-lg font-semibold">Your Result</h1>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <Circle percentage={parseFloat(result.hireablePercentage)} />
                    </motion.div>
                </div>
                <TypingText text={main[0].note} />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="md:grid grid-cols-2 md:gap-10 items-start justify-center px-[50px] w-full max-w-4xl mt-[20px]"
            >
                {feedbackCategories.map((category, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/10 p-6 rounded-xl hover:bg-white/15 transition-all border border-white/20 shadow-xl backdrop-blur-sm"
                    >
                        <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            {category.title}
                        </h2>
                        <ul className="space-y-3">
                            {category.items.map((item, itemIndex) => (
                                <motion.li
                                    key={itemIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: itemIndex * 0.05 }}
                                    className="text-gray-300 text-sm p-3 bg-black/20 rounded-lg hover:bg-black/30 transition-colors border border-white/10 md:mt-0 mt-4"
                                >
                                    <TypingText text={item} />
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>

            <Footer />
        </section>
    );
};

export default Results;