import { useState, useEffect } from "react";

import Select from "../../utils/Select";


const mcqsTestImage = "https://www.fluencyhive.com/wp-content/uploads/2024/08/mcq-test.svg";


export default function InitialScreen({ setTab, fetching, numOfQuesOptions, setTotalQues }) {

  const [isStartingTest, setIsStartingTest] = useState(false); 

  useEffect(() => {

    if (!fetching && isStartingTest) {
      setTab(prev => ({
        ...prev,
        initialScreen: false,
        test: true
      }));
    }
  }, [fetching, isStartingTest, setTab]);


  const handleStartTest = () => setIsStartingTest(true);


  const handleNumOfQues = option => {
    setTotalQues(option);
  }

  return (
    <div className={`
      container
      w-[95%] max-w-2xl h-auto min-h-[35rem] flex flex-col items-center justify-center gap-7 border px-5 py-10 mx-auto mt-5
      rounded-lg
      bg-light-300 text-secondaryPurple
      sm:px-10
    `}>
      <div className="heading text-center text-2xl md:text-4xl font-bold sm:text-3xl md:w-full">
        English Grammar Test
      </div>
      <div className="img-cont w-[70%] max-w-[15rem] ">
        <img
          className="size-full object-cover rounded-xl"
          src={mcqsTestImage}
          alt="English Grammar Test - Reference Image"
        />
      </div>
      <div className="actions w-full flex flex-col gap-5 justify-evenly items-center sm:flex-row md:w-[80%]">
        <Select
          label="No. of Questions"
          options={numOfQuesOptions}
          onChange={handleNumOfQues}
        />
        <button
          className={`
            w-[90%] px-6 py-1 border rounded
            font-semibold
            ${isStartingTest ? "opacity-50" : "opacity-100"}
            border-orange-500 bg-primaryOrange text-white sm:w-fit
          `}
          onClick={handleStartTest}
          disabled={isStartingTest ? true : false}
        >
          {isStartingTest ? "Loading…" : "Start Test"}
        </button>
      </div>
    </div>
  );
}
