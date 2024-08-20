const CircularProgress = ({ percentage: progress }) => {

  const radius = 59;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  
  const getColorClass = percentage => {

    if (percentage < 40) {
      return "#EF4444"; 
    }
    else if (percentage >= 40 && percentage < 70) {
      return "#F59E0B";
    }
    else if (percentage >= 70 && percentage < 100) {
      return "#10B981";
    }
    else {
      return "#3B82F6";
    }
  };
  

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
          stroke={getColorClass(progress)}
          strokeWidth="6"
          className="fill-transparent transition-all"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col justify-center items-center absolute inset-0 text-center font-sans">
        <div className="text-2xl font-semibold" style={{ color: getColorClass(progress) }}>
          {`${progress}%`}
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
