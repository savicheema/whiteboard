import { useState, useRef, useEffect } from "react";
import "./App.css";
import store from "./store";
import Canvas from "./components/Canvas";
import ToolPanel from "./components/ToolPanel";
import { Provider } from "react-redux";

function App() {
  const [isDark, setDarkMode] = useState("white");
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("DEBUG", navigator.userAgent);
    const ua = navigator.userAgent;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        ua
      )
    ) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        {/* <header className="App-header">
        <h1>Welcome to Whiteboard app</h1>
        
        </header> */}
        <Canvas isDark={isDark} {...{ canvasRef, isMobile }} />
        <ToolPanel
          setDarkMode={(para) => setDarkMode(para)}
          {...{ isDark, canvasRef, isMobile }}
        />
      </div>
    </Provider>
  );
}

export default App;
