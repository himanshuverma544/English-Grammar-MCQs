export default function Test({ setTab, totalQues, fetching, mcqs, qNum, setQNum, chosenOptions, setChosenOptions }) {
  
  const handleChosenOption = (qNum, option) =>
    setChosenOptions(new Map(chosenOptions.set(qNum, option)));
  

  const disablePrevBtn = () => qNum <= 0;

  const disableNextBtn = () => fetching || qNum >= mcqs.length;


  const handlePrevBtn = () => setQNum(prev => prev - 1);


  const atLastQue = () => qNum >= mcqs.length - 1;

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


  return (
    mcqs.length > 0 &&
      <div className="container w-[95%] max-w-xl flex flex-col items-center justify-center gap-10 p-10 mt-5 mx-auto rounded-lg border bg-light-100 text-secondaryPurple">

        <div className="question flex flex-col gap-5">
          <div className="the-question flex flex-col gap-3 py-2 font-semibold sm:text-xl">

            <p className="question-cont flex gap-2">
              <span className="qNum">
                {`Q${qNum + 1}.`}
              </span>
              <span className="question-text">
                {`${mcqs[qNum]?.question}`}
              </span>
            </p>

            {mcqs[qNum]?.sentence &&
              <p className="sentence text-sm ms-8 sm:text-base">
                {mcqs[qNum]?.sentence}
              </p>
            }
          </div>

          <div className="options flex flex-col gap-4 ms-2 text-sm sm:text-base">
            {Object.entries(mcqs[qNum]?.options).map(([key, value], index) => (
                <label key={index} className="ps-10 relative cursor-pointer">
                  {value}
                  <input
                    id="mcq-option"
                    type="radio"
                    name="radio"
                    className="absolute opacity-0 peer"
                    onChange={() => handleChosenOption(qNum, key)}
                    checked={chosenOptions.get(qNum) === key}
                  />
                  <span
                    className={`
                      checkmark
                      w-6 h-6 border-[5px]
                      absolute top-0 left-0
                      rounded-full
                      bg-gray-700 border-gray-300
                      peer-checked:bg-white peer-checked:border-primaryOrange 
                    `}>
                  </span>
                </label>
              ))}
          </div>
        </div>

        <div className="actions-and-tracking flex flex-wrap justify-between items-center gap-5">
          <button 
            className={`
              px-6 py-1 border rounded text-xs font-semibold sm:text-sm
              border-gray-300 bg-gray-700 text-gray-300       
              ${disablePrevBtn() ? "opacity-50" : "hover:border-orange-500 hover:bg-primaryOrange hover:text-light-100"}
            `}
            onClick={handlePrevBtn}
            disabled={disablePrevBtn()}
          >
            Previous
          </button>

          <div className="current-que-num-from-total order-last grow text-center px-6 py-1 text-sm font-semibold sm:order-none">
            {`${qNum + 1} / ${totalQues}`}
          </div>

          <button 
            className={`
              px-6 py-1 border rounded text-sm font-semibold sm:text-base
              ${fetching && "opacity-50"}
              ${!atLastQue() ? 
                "border-purple-500 bg-primaryPurple text-white" :
                "border-orange-500 bg-primaryOrange text-white"
              }
            `}
            onClick={handleNextBtn}
            disabled={disableNextBtn()}
          >
            {fetching ? "Please Wait..." : (!atLastQue() ? "Next" : "Finish")}
          </button>
        </div>
      </div>
  );
}
