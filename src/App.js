import React, { useState, useEffect } from "react";
import "./App.css";

function ExternalComponentFromAPI() {
  const testFunc = event => {
    console.log("=== event fire ===");
  };

  useEffect(() => {
    window.addEventListener("TEST_EVENT", event => testFunc(event));

    return () => {
      window.removeEventListener("TEST_EVENT", event => testFunc(event));
    };
  }, []);
  return <div>example</div>;
}

function App() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      window.dispatchEvent(
        new CustomEvent("TEST_EVENT", {
          bubbles: true,
          composed: true,
          detail: {
            text: "data"
          }
        })
      );
    }
  }, [show]);

  return (
    <div className="App">
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        Show me
      </button>
      {show && (
        <div>
          <ExternalComponentFromAPI />
        </div>
      )}
    </div>
  );
}

export default App;
