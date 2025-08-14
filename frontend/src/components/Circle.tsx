export const Circle = ({ percentage }: { percentage: number }) => {
    const radius = 80; // Increased size
    const strokeWidth = 20; // Adjusted stroke width
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex justify-center items-center relative overflow-hidden">
            <svg width="200" height="200" viewBox="0 0 200 200" className="relative">
                <defs>
                    <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F180B7" />
                        <stop offset="50%" stopColor="#BD6EDF" />
                        <stop offset="100%" stopColor="#254CF7" />
                    </linearGradient>
                </defs>

                <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke="#232226" 
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={0} 
                />

                <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke="url(#gradientStroke)" 
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset} 
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)" 
                />
            </svg>
            <div className="absolute flex flex-col items-center bg-transparent overflow-hidden p-12">
                <p className="text-gray-500 text-sm font-semibold">You got</p>
                <span className="text-white text-2xl bg-transparent">{percentage}%</span>
            </div>
        </div>
    );
}
