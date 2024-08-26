import { useState, useEffect, useCallback } from 'react';

import Axios from "axios";

import InitialScreen from './components/InitialScreen';
import Test from './components/Test';
import Result from './components/Result';

import fetchAndStore from '../../functions/mcqs/fetchAndStore';
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
  

  const fetchMcqs = useCallback(async () => {

    try {
      const url = `${import.meta.env.VITE_GEMINI_API_URL}-remove_me_later`;

      const response = await Axios.get(url);
      const { data: { candidates: [{ content: { parts: [{ text }] } }] } } = response;
  
      const mcqsArr = formatTextToObject(text);
      setMcqs(prev => prev.concat(mcqsArr));      
    }
    catch (error) {

      try {
        const url = import.meta.env.VITE_BACKUP_MCQS_URL;
      
        const backupMcqs = await fetchAndStore(url);

        setMcqs(prev => prev.concat(
          backupMcqs.slice(
            NUM_QUES_TO_GENERATE * fetchedCount,
            NUM_QUES_TO_GENERATE * (fetchedCount + 1)
          )
        ));
      }
      catch (error) {
        console.error(`Error in Backup API: ${error}`);
      }

      console.error(`Error in Gemini API: ${error}`);
    }

    setFetchedCount(prev => prev + 1);
    setFetching(false);

  }, [fetchedCount]);


  useEffect(() => {
    
    if (tab.initialScreen) {
      setFetching(true);
      fetchMcqs();
    }
  }, [tab.initialScreen]);
  

  useEffect(() => {

    function loadMoreMcqs() {

      const timesToFetchQues = totalQues / NUM_QUES_TO_GENERATE;
      const fetchBeforeQues = 2;
  
      if (
        qNum > 0 &&
        (qNum + fetchBeforeQues) % NUM_QUES_TO_GENERATE === 0 &&
        fetchedCount < timesToFetchQues
      ) {
        setFetching(true);
        fetchMcqs();
      }
    }
    loadMoreMcqs();
    
  }, [qNum, totalQues]);
  

  useEffect(() => {

    if (qNum === totalQues - 1) {

      function getCorrectOptions() {

        for (const i in mcqs) {
          const { correct_option } = mcqs[i];
          setCorrectOptions(correctOptions.set(parseInt(i), correct_option));
        }
      }
      getCorrectOptions();
    }
  }, [correctOptions, qNum , mcqs, totalQues]);


  useEffect(() => {

    if (tab.result) {

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
