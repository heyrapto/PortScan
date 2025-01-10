export const Circle = ({percentage}: {percentage: number}) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    const circleStyle = `rounded-full bg-gradient-to-r from-pink-400 via-blue-600 to-pink-400 p-2 circle`;
    const bgCircleStyle = `flex flex-col w-full h-[135px] items-center justify-center bg-[#040018] rounded-full circle`;

    return(
        <div className="flex justify-center items-center">
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
                strokeWidth="8"
                />
                <circle 
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke={bgCircleStyle}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                />
            </svg>
            <div className="absolute text-center">
                <p className="text-sm">Goal</p>
            </div>
            <div className="absolute right-[-26px] top-0">
                    <p className="text-gray-500 text-[0.7rem] font-semibold">You got</p>
                 <span className="text-white bg-transparent text-[1.5rem]">{percentage}%</span>
                </div>
        </div>
    )
}