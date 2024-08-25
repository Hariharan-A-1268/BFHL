import React, { useState } from "react";
import "./JsonInput.css";

function JsonInput({ onSubmit }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    try {
      const parsedInput = JSON.parse(input);
      setError("");
      onSubmit(parsedInput);
    } catch (e) {
      setError("Invalid JSON format");
    }
  };

  return (
    <div className="json-input-container">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter JSON here"
        className="json-textarea"
      />
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default JsonInput;
