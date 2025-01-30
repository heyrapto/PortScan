export const Circle = ({ percentage }: { percentage: number }) => {
    const radius = 50;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex justify-center items-center relative overflow-hidden">
            <svg width="120" height="120" viewBox="0 0 120 120" className="relative">
                <defs>
                    <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f472b6" />
                        <stop offset="50%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#f472b6" />
                    </linearGradient>
                </defs>

                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    stroke="#fff" 
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={0} 
                />

                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    stroke="url(#gradientStroke)" 
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset} 
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)" 
                />
            </svg>
            <div className="absolute flex flex-col items-center bg-transparent overflow-hidden">
                <p className="text-gray-500 text-[0.7rem] font-semibold">You got</p>
                <span className="text-white text-[1.5rem] bg-transparent">{percentage}%</span>
            </div>
        </div>
    );
};
