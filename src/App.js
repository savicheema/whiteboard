import { useState, useRef } from "react";
import "./App.css";
import store from "./store";
import Canvas from "./components/Canvas";
import ToolPanel from "./components/ToolPanel";
import { Provider } from "react-redux";

function App() {
  const [isDark, setDarkMode] = useState("white");
  const canvasRef = useRef(null);

  return (
    <Provider store={store}>
      <div className="App">
        {/* <header className="App-header">
        <h1>Welcome to Whiteboard app</h1>
        
        </header> */}
        <Canvas isDark={isDark} {...{ canvasRef }} />
        <ToolPanel
          setDarkMode={(para) => setDarkMode(para)}
          {...{ isDark, canvasRef }}
        />
      </div>
    </Provider>
  );
}

export default App;
