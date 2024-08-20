import { useState, useEffect } from 'react';

import Axios from "axios";

import InitialScreen from './components/InitialScreen';
import Test from './components/Test';
import Result from './components/Result';

import formatTextToObject from "../../functions/mcqs/formatTextToObject";

const numOfQuesOptions = [15, 30, 50];
const [defaultOption] = numOfQuesOptions;

const FIRST_QUE_NUM = 0;
const NUM_QUES_TO_GENERATE = 5;

const INITIAL_FETCHED_COUNT = 0;


export default function Mcqs() {

  const [tab, setTab] = useState({
    initialScreen: true,
    test: false,
    result: false
  });

  const [totalQues, setTotalQues] = useState(defaultOption);

  const [mcqs, setMcqs] = useState([]);
  const [qNum, setQNum] = useState(FIRST_QUE_NUM);
  
  const [fetching, setFetching] = useState(true);
  const [fetchedCount, setFetchedCount] = useState(INITIAL_FETCHED_COUNT);

  const [correctOptions, setCorrectOptions] = useState(new Map());
  const [chosenOptions, setChosenOptions] = useState(new Map());

  const [score, setScore] = useState({
    percentage: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    unattemptedQues: totalQues
  });
  

  const fetchMcqs = async () => {

    const url = import.meta.env.VITE_MCQS_DUMMY_URL;

    try {
      const { data: { mcqsDummy: response } } = await Axios.get(url);
      const { data: { candidates: [{ content: { parts: [{ text }] } }] } } = response;

      // const mcqsObj = formatTextToObject(text);
      const mcqsObj = text;
      setMcqs(prev => prev.concat(mcqsObj));
      setFetching(false);
    }
    catch (error) {
      console.error(error);
      setFetching(false);
    }
  }

  useEffect(() => {

    if (tab.initialScreen) {
      setFetching(true);
      fetchMcqs();
      setFetchedCount(prev => prev + 1);
    }
  }, [tab.initialScreen]);

  useEffect(() => {

    function fetchMoreQues() {

      const timesToFetchQues = totalQues / NUM_QUES_TO_GENERATE;

      if (
        (qNum - timesToFetchQues) % NUM_QUES_TO_GENERATE === 0 &&
        fetchedCount < timesToFetchQues
      ) {
        setFetching(true);
        fetchMcqs();
        setFetchedCount(prev => prev + 1);
      }
    }
    fetchMoreQues();

  }, [qNum, fetchedCount, totalQues]);


  useEffect(() => {

    function getCorrectOptions() {

      if (qNum === totalQues - 1) {
        for (const i in mcqs) {
          const { correct_option } = mcqs[i];
          setCorrectOptions(correctOptions.set(parseInt(i), correct_option));
        }
      }
    }
    getCorrectOptions();

  }, [correctOptions, qNum , mcqs, totalQues]);


  useEffect(() => {

    function calculateScore() {
      
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      let unattemptedQues = 0;
      let percentage = 0;

      for (let [qNum, option] of chosenOptions) {

        if(correctOptions.has(qNum) && correctOptions.get(qNum) === option) {
          correctAnswers++;
        }
        else {
          incorrectAnswers++;
        }
      }

      unattemptedQues = correctOptions.size - chosenOptions.size;
      percentage = (correctAnswers * 100) / correctOptions.size;

      setScore({
        percentage,
        correctAnswers,
        incorrectAnswers,
        unattemptedQues
      });
    }

    if (tab.result) {
      calculateScore();
    }

  }, [tab.result, chosenOptions, correctOptions, setScore]);


  return (
    <>
      {tab.initialScreen &&
        <InitialScreen
          setTab={setTab}
          setTotalQues={setTotalQues}
          numOfQuesOptions={numOfQuesOptions}
        />
      }
      {tab.test &&
        <Test
          setTab={setTab}
          totalQues={totalQues}
          fetching={fetching}
          mcqs={mcqs}
          qNum={qNum}
          setQNum={setQNum}
          chosenOptions={chosenOptions}
          setChosenOptions={setChosenOptions}
        />
      }
      {tab.result &&
        <Result
          setTab={setTab}
          setMcqs={setMcqs}
          firstQueNum={FIRST_QUE_NUM}
          setQNum={setQNum}
          initialFetchedCount={INITIAL_FETCHED_COUNT}
          setFetchedCount={setFetchedCount}
          setCorrectOptions={setCorrectOptions}
          setChosenOptions={setChosenOptions}
          totalQues={totalQues}
          score={score}
          setScore={setScore}
        />
      }
    </>
  );
}
