<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import "./App.css";
import Swatch from "./components/swatch";
import rough from "roughjs/bundled/rough.esm";

const gen = rough.generator();
function createElement(id, x1, y1, x2, y2, color) {
  const roughEle = gen.line(x1, y1, x2, y2, {stroke: color});
  return { id, x1, y1, x2, y2, roughEle };
}

const midPointBtw = (p1, p2) => {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  };
};

export const adjustElementCoordinates = (element) => {
  const { type, x1, y1, x2, y2 } = element;
  if (x1 < x2 || (x1 === x2 && y1 < y2)) {
    return { x1, y1, x2, y2 };
  } else {
    return { x1: x2, y1: y2, x2: x1, y2: y1 };
  }
};

function App() {
  const [elements, setElements] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('black')
  const [points, setPoints] = useState([]);
  const [path, setPath] = useState([]);
  // const [isAllowed, setAllowed] = useState(false);
  const [action, setAction] = useState("none");
  const [toolType, setToolType] = useState("none");
  const [selectedElement, setSelectedElement] = useState(null);
  const [isDark, setDarkMode] = useState("white")

  const handleUndoKeyDown = (event) => {
    if (event.ctrlKey && (event.key === 'z' || event.code === 'KeyZ')) {
      // Perform the Undo operation here
      undoClicked();
      event.preventDefault(); // Prevent the default "undo" action of the browser
    }
  };

  useEffect(() => {
    // console.log(isDrawing)
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    document.addEventListener('keydown', handleUndoKeyDown);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.save();
    const drawpath = () => {
      path.forEach((stroke, index) => {
        context.beginPath();

        stroke.forEach((point, i) => {
          var midPoint = midPointBtw(point.clientX, point.clientY);

          context.quadraticCurveTo(
            point.clientX,
            point.clientY,
            midPoint.x,
            midPoint.y
          );
          context.lineTo(point.clientX, point.clientY);
          context.stroke();
        });
        context.closePath();
        context.save();
      });
    };
    const roughCanvas = rough.canvas(canvas);
    if (path !== undefined) drawpath();
    elements.forEach(({ roughEle }) => {
      context.globalAlpha = "1";
      roughCanvas.draw(roughEle);
    });
    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      document.removeEventListener('keydown', handleUndoKeyDown);
    };
  }, [elements, path]);

  const updateElement = (index, x1, y1, x2, y2, toolType) => {
    const updatedElement = createElement(index, x1, y1, x2, y2, color, toolType);
    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);
  };

  const handleMouseDown = (e) => {
    // console.log(toolType);
    const { clientX, clientY } = e;
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const id = elements.length;
    if (toolType === "pencil") {
      setAction("sketching");
      setIsDrawing(true);
      const transparency = "1.0";
      const newEle = {
        clientX,
        clientY,
        transparency,
      };
      setPoints((state) => [...state, newEle]);
      context.lineCap = 5;
      context.moveTo(clientX, clientY);
      context.beginPath();
    } else {
      setAction("drawing");
      const element = createElement(id, clientX, clientY, clientX, clientY);

      setElements((prevState) => [...prevState, element]);
      setSelectedElement(element);
      // console.log(elements);
    }
  };

  const handleMouseMove = (e) => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const { clientX, clientY } = e;

    if (action === "sketching") {
      if (!isDrawing) return;

      const transparency = points[points.length - 1].transparency;
      const newEle = { clientX, clientY, transparency };

      setPoints((state) => [...state, newEle]);
      var midPoint = midPointBtw(clientX, clientY);
      context.quadraticCurveTo(clientX, clientY, midPoint.x, midPoint.y);
      context.lineTo(clientX, clientY);
      context.stroke();
    } else if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];

      updateElement(index, x1, y1, clientX, clientY, toolType);
    }
  };

  const handleMouseUp = () => {
    if (action === "drawing") {
      const index = selectedElement.id;
      const { id, type, strokeWidth } = elements[index];
      const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
      updateElement(id, x1, y1, x2, y2, type, strokeWidth);
    } else if (action === "sketching") {
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d")
      context.closePath();
      const element = points;
      setPoints([]);
      setPath((prevState) => [...prevState, element]); //tuple
      setIsDrawing(false);
    }
    setAction("none");
  };
  const changeColor = (evt) => {
    if(evt) { 
      setColor(evt.target.value);
    } else {
      console.error("No event detected!")
    }
   
  }
  // Undo function
  const undoClicked = () => {
    // console.log("Undo Clicked!")
    if(elements.length === 0 || elements === undefined) {
      console.log("It is initial State")
    } else {
      elements.pop();
      setElements([...elements]);
    }
  }

  const darkMode = () => {
    setDarkMode("black")
  }
  const lightMode = () => {
    setDarkMode("white")
  }
  return (
    <div>
      <canvas
        id="canvas"
        className="App"
        width={window.innerWidth}
        height={window.innerHeight * 0.9}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ backgroundColor: isDark}}
      >
        Canvas
      </canvas>
      {/* Button Controls section: Line, Undo, Eraser, Color Select */}
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <Swatch setToolType={setToolType} />
        <button 
          name="undo"
          onClick={undoClicked}>Undo</button>
        <select 
          name="color"
          onChange={changeColor}>
            {isDark === "white" && <option style={{color: 'black'}}>black</option>}
            <option style={{color: 'orange'}}>orange</option>
            <option style={{color: 'yellow'}}>yellow</option>
            <option style={{color: 'red'}}>red</option>
            <option style={{color: 'blue'}}>blue</option>
            <option style={{color: 'green'}}>green</option>
            <option style={{color: 'purple'}}>purple</option>
            <option style={{color: 'lavendar'}}>Lavender</option>
            {isDark === "black" && <option style={{color: 'white'}}>white</option>}
        </select>
        <button name="eraser">Eraser</button>
        <button onClick={darkMode}>Dark Mode</button>
        <button onClick={lightMode}>Light Mode</button>
      </div>
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
>>>>>>> c8d341d (Initialize project using Create React App)
    </div>
  );
}

export default App;
