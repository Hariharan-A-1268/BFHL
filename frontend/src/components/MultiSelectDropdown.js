import React from "react";
import "./MultiSelectDropdown.css";

function MultiSelectDropdown({ onChange }) {
  const options = ["Alphabets", "Numbers", "Highest lowercase alphabet"];

  return (
    <div className="dropdown-container">
      <select
        multiple
        onChange={(e) =>
          onChange(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )
        }
        className="dropdown"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MultiSelectDropdown;
