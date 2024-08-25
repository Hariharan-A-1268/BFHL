import React from "react";
import "./ResponseDisplay.css";

function ResponseDisplay({ response, filters }) {
  const filterResponse = () => {
    let filteredData = {};

    if (filters.includes("Alphabets"))
      filteredData.alphabets = response.alphabets;
    if (filters.includes("Numbers")) filteredData.numbers = response.numbers;
    if (filters.includes("Highest lowercase alphabet"))
      filteredData.highest_lowercase_alphabet =
        response.highest_lowercase_alphabet;

    return filteredData;
  };

  return (
    <div className="response-container">
      <h3>Filtered Response:</h3>
      <pre className="response-output">
        {JSON.stringify(filterResponse(), null, 2)}
      </pre>
    </div>
  );
}

export default ResponseDisplay;
