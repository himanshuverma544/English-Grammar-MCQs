import React from 'react';

import CircularProgress from '../../utils/CircularProgress';


export default function Result({ setTab, setMcqs, firstQueNum, setQNum, initialFetchedCount, setFetchedCount, setCorrectOptions, totalQues, score, setScore }) {

  const handleRetakeTestBtn = () => {

    setMcqs([]);

    setQNum(firstQueNum);

    setFetchedCount(initialFetchedCount);
    
    setCorrectOptions(prev => {
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
    <div className="container w-[95%] max-w-xl flex flex-col items-center justify-center gap-5 p-5 mt-5 mx-auto rounded-lg bg-gray-700 text-gray-300">
      <div className="heading text-center text-4xl font-semibold md:w-full">
        Your Score
      </div>
      <div className="score-board w-full flex justify-between items-center px-5 py-1">
        <div className="score w-1/2 flex flex-col font-semibold">
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
          className="px-6 py-1 border rounded"
          onClick={handleRetakeTestBtn}
        >
          Retake Test
        </button>
      </div>
    </div>
  );
}
