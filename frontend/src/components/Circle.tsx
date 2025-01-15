export const Circle = ({percentage}: {percentage: number}) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    const circleStyle = `linear-gradient(to right, #f472b6, #60a5fa, #f472b6)`;
    const bgCircleStyle = `#040018`;

    return(
        <div className="flex justify-center items-center relative">
            <svg
            className="120 relative"
            height="100"
            viewBox="0 0 120 120"
            >
                <circle 
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke={circleStyle}
                strokeWidth="10"
                />
                <circle 
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke={bgCircleStyle}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                />
            </svg>
            <div className="absolute right-[-26px] top-0">
                    <p className="text-gray-500 text-[0.7rem] font-semibold">You got</p>
                 <span className="text-white bg-transparent text-[1.5rem]">{percentage}%</span>
            </div>
        </div>
    )
}