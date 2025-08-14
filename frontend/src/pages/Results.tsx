import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8 w-full max-w-7xl mt-8"
>
    {feedbackCategories.map((category, index) => (
        <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.03 }}
            className="group relative bg-transparent p-8 rounded-2xl transition-all border border-white/10 shadow-2xl backdrop-blur-lg overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity" />
            
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {category.title}
            </h2>
            
            <ul className="space-y-4">
                {category.items.map((item, itemIndex) => (
                    <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIndex * 0.05 }}
                        className="flex items-start space-x-3 text-gray-300 text-base p-4 bg-transparent rounded-xl hover:bg-white/10 transition-colors border border-white/5 cursor-default"
                    >
                        <motion.span 
                            className="text-blue-400 mt-1"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            •
                        </motion.span>
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