export default function Test({ setTab, totalQues, mcqs, qNum, setQNum, chosenOptions, setChosenOptions }) {
  
  const handleChosenOption = (qNum, option) =>
    setChosenOptions(chosenOptions.set(qNum, option));
  

  const disablePrevBtn = () => qNum <= 0;

  const disableNextBtn = () => qNum >= mcqs.length;


  const handlePrevBtn = () => setQNum(prev => prev - 1);

  const handleNextBtn = () => {

    if (!atLastQue()) {
      setQNum(prev => prev + 1);
    }
    else {
      setTab(prev => ({
        ...prev,
        test: false,
        result: true
      }));
    }
  }

  const atLastQue = () => qNum >= mcqs.length - 1;


  return (
      <div className="container w-[95%] max-w-xl flex flex-col gap-5 p-5 mt-5 mx-auto rounded-lg bg-gray-700 text-gray-300">

        <div className="question w-3/4 flex flex-col gap-1 md:w-full">
          <div className="the-question flex flex-col gap-3 py-2 text-xl font-semibold">
            <p className="question-text">
              {`Q${qNum + 1}. ${mcqs[qNum]?.question}`}
            </p>
            {mcqs[qNum]?.sentence &&
              <p className="sentence text-lg ms-3">
                {mcqs[qNum]?.sentence}
              </p>
            }
          </div>

          <div className="options flex flex-col gap-4 ps-5 pt-3 ms-3">
            {Object.entries(mcqs[qNum]?.options).map(([key, value], index) => (
                <label key={index} className="ps-10 relative cursor-pointer">
                  {value}
                  <input
                    type="radio"
                    name="radio"
                    className="absolute opacity-0 peer"
                    onChange={() => handleChosenOption(qNum, key)}
                  />
                  <span
                    className={`
                      checkmark
                      w-6 h-6 border-[5px]
                      absolute top-0 left-0
                      rounded-full
                      bg-gray-700 border-gray-300
                      peer-checked:bg-white peer-checked:border-green-500
                    `}>
                  </span>
                </label>
              ))}
          </div>
        </div>

        <div className="actions-and-tracking flex justify-between items-center pt-3">
          <button 
            className={`
              px-6 py-1 border rounded
              border-gray-300 bg-gray-700 text-gray-300       
              ${disablePrevBtn() ? "opacity-50" : "hover:border-green-500 hover:bg-green-500"}
            `}
            onClick={handlePrevBtn}
            disabled={disablePrevBtn()}
          >
            Previous
          </button>

          <div className="current-que-num-from-total px-6 py-1 text-sm font-semibold">
            {`${qNum + 1} / ${totalQues} `}
          </div>

          <button 
            className={`
              px-6 py-1 rounded
              bg-green-500 text-white
            `}
            onClick={handleNextBtn}
            disabled={disableNextBtn()}
          >
            { !atLastQue() ? "Next" : "Finish"}
          </button>
        </div>
      </div>
  );
}
