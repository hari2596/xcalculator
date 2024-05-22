import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [expression, setExpression] = useState("");
  const [showValue, setShowValue] = useState("");

  const handleButtonClick = (value) => {
    setExpression((prev) => prev + value);
  };

  const calculateResult = () => {
    try {
      // Check if the expression is valid and complete
      if (/^[\d+\-*/.]+$/.test(expression) && !/[\+\-\*\/]$/.test(expression)) {
        // Evaluate the expression
        const result = new Function("return " + expression)();
        setShowValue(result);
      } else {
        setShowValue("Error");
      }
    } catch (error) {
      setShowValue("Error");
    }
  };

  const clearInput = () => {
    setExpression("");
    setShowValue("");
  };

  return (
    <div className="App">
      <div className="input-box">
        <h1>React Calculator</h1>
        <input type="text" value={expression} readOnly />
      </div>

      <div className="result-container">
        <h2>{showValue}</h2>
      </div>

      <div className="btn-container">
        {[7, 8, 9, "+", 4, 5, 6, "-", 1, 2, 3, "*", "C", 0, "=", "/"].map(
          (value, index) => (
            <button
              key={index}
              onClick={() => {
                if (value === "C") {
                  clearInput();
                } else if (value === "=") {
                  calculateResult();
                } else {
                  handleButtonClick(value);
                }
              }}
              className="btn"
            >
              {value}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Calculator;
