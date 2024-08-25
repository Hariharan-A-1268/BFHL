import React, { useState, useEffect } from "react";
import JsonInput from "./components/JsonInput";
import MultiSelectDropdown from "./components/MultiSelectDropdown";
import ResponseDisplay from "./components/ResponseDisplay";
import "./App.css";

function App() {
  const [jsonInput, setJsonInput] = useState(null);
  const [response, setResponse] = useState(null);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    document.title = "Hariharan A";
  }, []);

  const handleJsonSubmit = async (input) => {
    setJsonInput(input);
    try {
      const result = await fetch("https://bfhl-rho.vercel.app/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await result.json();
      console.log(data);
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Enter Input</h1>
      <JsonInput onSubmit={handleJsonSubmit} />
      {response && (
        <>
          <MultiSelectDropdown onChange={setFilters} />
          <ResponseDisplay response={response} filters={filters} />
        </>
      )}
    </div>
  );
}

export default App;
