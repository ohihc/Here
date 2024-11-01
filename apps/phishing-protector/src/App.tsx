import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    console.table({
      url: window.location.href,
      name: "hello world",
    });
  }, []);

  return <></>;
}

export default App;
