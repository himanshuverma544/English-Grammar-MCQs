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
    <div className="container w-[95%] max-w-xl flex flex-col items-center justify-center gap-10 p-5 mt-5 mx-auto rounded-lg bg-gray-700 text-gray-300">
      <div className="heading text-center text-4xl font-semibold md:w-full">
        English Grammar Test
      </div>
      <div className="img-cont w-[80%]">
        <img
          className="size-full object-cover rounded-lg"
          src="https://www.fluencyhive.com/wp-content/uploads/2024/07/low_quality-diXxT84RUC-1.jpg"
          alt="English Grammar Test - Reference Image"
        />
      </div>
      <div className="actions w-[80%] flex justify-between items-center">
        <Select
          label="No. of Questions"
          options={numOfQuesOptions}
          onChange={handleNumOfQues}
        />
        <button
          className="px-6 py-1 border rounded"
          onClick={handleStartTest}
        >
          Start Test
        </button>
      </div>
    </div>
  );
}
