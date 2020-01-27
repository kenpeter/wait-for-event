import React, { useState, useEffect } from "react";
import "./App.css";

function Example() {
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

  return (
    <div className="App">
      <button
        onClick={() => {
          setShow(!show);

          // QUESTION: is it a way not to use setTimeout
          setTimeout(function() {
            window.dispatchEvent(
              new CustomEvent("TEST_EVENT", {
                bubbles: true,
                composed: true,
                detail: {
                  text: "data"
                }
              })
            );
          }, 2000);
        }}
      >
        Show me
      </button>
      {show && (
        <div>
          <Example />
        </div>
      )}
    </div>
  );
}

export default App;
