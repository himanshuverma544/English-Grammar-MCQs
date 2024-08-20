import getKey from '../utils/getKey';


export default function formatTextToObject(text) {

  // Split the text into individual questions using a more robust regular expression
  const questionsText = text.split(/(?:\*\*MCQ \d+\*\*)/).filter(Boolean);

  // Process each question
  const questions = questionsText.map((qText, index) => {
    const lines = qText
      .trim()
      .split("\n")
      .filter((line) => line.trim() !== "");

    let question = "";
    let sentence = null;
    const options = {};
    let i;

    for (i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("(a)") || line.startsWith("(b)") || line.startsWith("(c)") || line.startsWith("(d)")) break; // Stop when the options start

      // Check if the line contains a sentence in double quotes
      const match = line.match(/"([^"]*)"/);
      if (match) {
        sentence = match[0]; // Store the full sentence including the quotes
      } else {
        question += line + " ";
      }
    }

    question = question.trim(); // Remove any extra spaces

    // Extract options
    for (; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("**Answer:")) break; // Stop when the answer line is found
      const [key, value] = line.split(") ").map((part) => part.trim());
      if (key && value) {
        const cleanedKey = key.replace("(", ""); // Remove the left curly brace
        options[cleanedKey] = value;
      }
    }

    // Extract correct answer
    const correctAnswerLine = lines[i] || "";
    const correctAnswerKey = correctAnswerLine
      .match(/\(\w\)/)?.[0] // Extract the key in the format (a), (b), etc.
      .replace("(", "")
      .replace(")", "")
      .trim();

    const correctAnswer = options[correctAnswerKey] || "";

    return {
      id: getKey(),
      question,
      sentence,
      options,
      correct_option: correctAnswerKey,
      correct_answer: correctAnswer,
    };
  });

  return questions;
}
