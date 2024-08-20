const CircularProgress = ({ percentage: progress }) => {

  const radius = 59;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-block">
      <svg width="160" height="160" className="-rotate-90">
        <circle
          r={radius}
          cy="80"
          cx="80"
          strokeWidth="6"
          className="fill-transparent stroke-gray-200"
        />
        <circle
          r={radius}
          cy="80"
          cx="80"
          strokeWidth="6"
          className="fill-transparent stroke-green-500 transition-all"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col justify-center items-center absolute inset-0 text-center font-sans">
        <div className="text-2xl text-white">{progress}%</div>
      </div>
    </div>
  );
};

export default CircularProgress;
