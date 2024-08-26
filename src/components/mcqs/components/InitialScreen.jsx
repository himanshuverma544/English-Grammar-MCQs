import React from 'react';

import Select from "../../utils/Select";


export default function InitialScreen({ setTab, numOfQuesOptions, setTotalQues }) {


  const handleStartTest = () => setTab(prev => ({
    ...prev,
    initialScreen: false,
    test: true
  }));


  const handleNumOfQues = option => {
    setTotalQues(option);
  }

  return (
    <div className={`
      container
      w-[95%] max-w-2xl h-auto min-h-[35rem] flex flex-col items-center justify-center gap-7 border px-5 py-10 mx-auto mt-5
      rounded-lg
      bg-light-100 text-secondaryPurple
      sm:px-10
    `}>
      <div className="heading text-center text-2xl md:text-4xl font-bold sm:text-3xl md:w-full">
        English Grammar Test
      </div>
      <div className="img-cont w-[70%] max-w-[15rem] ">
        <img
          className="size-full object-cover rounded-xl"
          src="https://www.fluencyhive.com/wp-content/uploads/2024/08/mcq-test.svg"
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
          className="w-[90%] px-6 py-1 border rounded font-semibold border-orange-500 bg-primaryOrange text-white sm:w-fit"
          onClick={handleStartTest}
        >
          Start Test
        </button>
      </div>
    </div>
  );
}
