import getKey from "../utils/getKey";


function isValidJsonObject(item) {

  // Check if item is a valid JSON object with expected properties
  return ( 
    item &&
    typeof item === 'object' &&
    !Array.isArray(item) && 
    item.hasOwnProperty('question') &&
    item.hasOwnProperty('sentence') &&
    item.hasOwnProperty('options') &&
    item.hasOwnProperty('correct_option') &&
    item.hasOwnProperty('correct_answer')
  );
}

function restFinishing(parsedJson) {

  if (Array.isArray(parsedJson)) {

    return parsedJson.filter(item => isValidJsonObject(item)).map(item => {

      // Ensure the sentence property is wrapped in double quotes if it's not null
      if (item.sentence !== null && typeof item.sentence === 'string') {
        item.sentence = `"${item.sentence}"`;
      }
      
      // Assign a unique key to the id property
      item.id = getKey(); 
      
      return item;
    });
  }
  return parsedJson;
}

function correctAndParseJson(jsonString) {

  try {
    // Remove '* and `' characters from the entire JSON string
    let cleanedString = jsonString.replace(/[\*`]/g, '');

    // Remove unrelated text before or after the JSON array
    cleanedString = jsonString.match(/\[.*\]/s)?.[0] || "";

    // Replace single quotes with double quotes
    cleanedString = cleanedString.replace(/'/g, '"');

    // Remove any trailing commas before closing braces or brackets
    cleanedString = cleanedString.replace(/,\s*(\}|\])/g, '$1');

    // Escape unescaped double quotes in sentences or text
    cleanedString = cleanedString.replace(/(?<!\\)"/g, '\\"').replace(/\\"/g, '"');

    // Attempt to parse the cleaned and corrected JSON string
    const parsedJson = JSON.parse(cleanedString);

    // Assigning unique id to each array object and double quotes to non null sentences
    return restFinishing(parsedJson);
  }
  catch (error) {
    throw new Error("Unable to correct and parse JSON. Please review the format.");
  }
}

export default correctAndParseJson;
