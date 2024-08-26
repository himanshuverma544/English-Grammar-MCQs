import React from 'react';

import CircularProgress from '../../utils/CircularProgress';


export default function Result({ setTab, setMcqs, firstQueNum, setQNum, initialFetchedCount, setFetchedCount, setCorrectOptions, setChosenOptions, totalQues, score, setScore }) {

  const handleRetakeTestBtn = () => {

    setMcqs([]);

    setQNum(firstQueNum);

    setFetchedCount(initialFetchedCount);
    
    setCorrectOptions(prev => {
      prev.clear();
      return new Map();
    });

    setChosenOptions(prev => {
      prev.clear();
      return new Map();
    });

    setScore({
      percentage: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      unattemptedQues: totalQues
    });

    setTab(prev => ({ ...prev, initialScreen: true, result: false }));
  }

  return (
    <div className={`
      container
      w-[95%] max-w-2xl h-auto min-h-[30rem] flex flex-col items-center justify-center gap-8 border p-10 mx-auto mt-5
      rounded-lg
      bg-light-100 text-secondaryPurple
    `}>

      <div className="heading text-4xl font-semibold">
        Your Score
      </div>

      <div className="score-board w-full flex flex-col items-center justify-between gap-5 py-1 sm:flex-row">
        <div className="score flex flex-col font-semibold">
          <span>Total Questions: {totalQues}</span>
          <span>Correct Answers: {score.correctAnswers}</span>
          <span>Incorrect Answers: {score.incorrectAnswers}</span>
          <span>Unattempted Questions: {score.unattemptedQues}</span>
        </div>

        <div className="score-percentage w-1/2 flex justify-center items-center">
          <CircularProgress percentage={Math.floor(score.percentage)}/>
        </div>
      </div>

      <div className="actions">
        <button
          className="px-6 py-1 border rounded font-semibold border-orange-500 bg-primaryOrange text-white"
          onClick={handleRetakeTestBtn}
        >
          Retake Test
        </button>
      </div>
    </div>
  );
}
