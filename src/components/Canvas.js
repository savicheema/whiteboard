import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { SET_OBJECTS, UNDO_ACTION, REDO_ACTION } from "../store/consts";
import "./Canvas.css";

const Canvas = ({ shape, color, objects, setObjects, isDark, undo, redo }) => {
  // const [bgColor, setBgColor] = useState("white")
  const canvasRef = useRef(null);
  const drawingState = useRef("");
  const lastMousePosition = useRef({ x: 0, y: 0 });

  const calcDistance = (x1, y1, x2, y2) => {
    let distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance;
  };
  const drawObjectsOnCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    objects.forEach((object, key) => {
      ctx.globalCompositeOperation = "source-over";
      if (object.shape === "eraser") {
        document.body.style.cursor =
          "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkAgMAAACcbnALAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAlQTFRFAAAAAAAA////g93P0gAAAAN0Uk5TAP//RFDWIQAAAFxJREFUeJxjYMAOWEMdIAzGqFVTISyxVatWBYBZWUDWErAkkLFqJYjFBmKtAumRArMmQJVBFMJZYA1gLdhYEENAxlDCwm8HNlchuRnhD4TfEP5FCgNEuCDCCg8AAHUsdO0s/5hdAAAAAElFTkSuQmCC) 0 0, default !important";
        // document.body.style.cursor = "url('eraser-cursor.png'), auto";
      } else {
        // document.body.style.cursor = "url(path/to/eraser-cursor.png), auto";
        // document.body.style.cursor = "url('eraser-cursor.png'), auto";
      }
      if (object.color === "black" && isDark === "black") {
        object.color = "white";
      }
      if (object.color === "white" && isDark === "white") {
        object.color = "black";
      }
      switch (object.shape) {
        case "pencil":
        case "line":
          ctx.beginPath();
          ctx.moveTo(object.pts[0].x, object.pts[0].y);
          for (let i = 1; i < object.pts.length; i++) {
            ctx.lineTo(object.pts[i].x, object.pts[i].y);
          }
          ctx.strokeStyle = object.color;
          ctx.lineWidth = 2;
          ctx.stroke();
          break;

        case "rect":
          ctx.beginPath();
          ctx.strokeStyle = object.color;
          ctx.lineWidth = 2;
          let x = Math.min(object.pts[0].x, object.pts[1].x);
          let y = Math.min(object.pts[0].y, object.pts[1].y);
          let width = Math.abs(object.pts[0].x - object.pts[1].x);
          let height = Math.abs(object.pts[0].y - object.pts[1].y);
          ctx.strokeRect(x, y, width, height);
          break;
        case "circle":
          console.log(object);
          console.log("circle");
          ctx.beginPath();
          ctx.strokeStyle = object.color;
          ctx.lineWidth = 2;
          let radius = calcDistance(
            object.pts[0].x,
            object.pts[0].y,
            object.pts[1].x,
            object.pts[1].y
          );
          ctx.arc(
            object.pts[0].x,
            object.pts[0].y,
            radius,
            0,
            2 * Math.PI,
            false
          );
          ctx.stroke();
          break;
        // let x = Math.min(object.pts[0].x, object.pts[1].x);
        // let y = Math.min(object.pts[0].y, object.pts[1].y);
        // let width = Math.abs(object.pts[0].x - object.pts[1].x);
        // let height = Math.abs(object.pts[0].y - object.pts[1].y);
        // ctx.strokeRect(x, y, width, height);
        case "text":
          ctx.font = "25px Arial";
          ctx.fillStyle = object.color;
          let metrics = ctx.measureText(object.text);
          console.log(metrics.width);
          // ctx.font = "30px Arial"
          ctx.fillText(object.text, object.pts[0].x, object.pts[0].y);
          if (key === objects.length - 1) {
            ctx.beginPath();
            console.log("text length");
            // console.log(objects.length - 1);
            console.log(metrics.width);
            ctx.moveTo(object.pts[0].x + metrics.width, object.pts[0].y - 20);
            ctx.lineTo(object.pts[0].x + metrics.width, object.pts[0].y);
            ctx.stroke();
          }
          break;

        case "eraser":
          ctx.globalCompositeOperation = "destination-out";
          for (let i = 0; i < object.pts.length; i++) {
            ctx.fillRect(object.pts[i].x, object.pts[i].y, 30, 30);
          }
          break;

        default:
          break;
      }
    });
  }, [isDark, objects]);

  useEffect(() => {
    console.log("shape changed", shape);
  }, [shape]);

  useEffect(() => {
    drawObjectsOnCanvas();
  }, [drawObjectsOnCanvas]);

  const handleMouseDown = (e) => {
    console.log(e, shape);
    drawingState.current = "draw";
    const x = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    const y = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
    lastMousePosition.current = { x, y };
    objects.push({
      shape,
      color,
      text: "",
      pts: [
        { x, y },
        { x, y },
      ],
    });
    setObjects([...objects]);
  };
  const handleMouseMove = (e) => {
    if (drawingState.current === "draw") {
      const x = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const y = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
      if (shape === "pencil" || shape === "eraser") {
        objects[objects.length - 1].pts.push({ x, y });
      } else {
        objects[objects.length - 1].pts[1] = { x, y };
      }
      setObjects([...objects]);
    }
  };

  const handleMouseUp = () => {
    drawingState.current = "";
  };

  const handleKeyDown = (event) => {
    // console.log(e.key);
    if (event.ctrlKey && (event.key === "z" || event.code === "KeyZ")) {
      // Perform the Undo operation here
      undo();
      // Prevent the default "undo" action of the browser
    }
    if (event.ctrlKey && (event.key === "y" || event.code === "KeyY")) {
      // Perform the Undo operation here
      redo();
    }

    if (shape === "text") {
      // console.log(event);
      if (event.key === "Backspace") {
        objects[objects.length - 1].text = objects[
          objects.length - 1
        ].text.substr(0, objects[objects.length - 1].text.length - 1);
        setObjects([...objects]);
        return;
      }

      if (event.key === " " || event.key === "`") {
        console.log("yes");
        objects[objects.length - 1].text += event.key;
        setObjects([...objects]);
      }
      if (event.key.length > 1) {
        return;
      }
      const regex = /^[~a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
      if (regex.test(event.key)) {
        console.log(event.key);
        objects[objects.length - 1].text += event.key;
        setObjects([...objects]);
      }
    }

    event.preventDefault();
  };
  // console.log(isDark, "isDark");
  return (
    <div
      className={["canvas", shape === "eraser" ? "eraser-cursor" : ""]
        .filter((className) => !!className)
        .join(" ")}
    >
      <canvas
        style={{ backgroundColor: isDark }}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        tabIndex="0"
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight * 0.95}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  shape: state.shape,
  objects: state.objects,
  color: state.color,
});

const mapDispatchToProps = (dispatch) => ({
  setObjects: (objects) => dispatch({ type: SET_OBJECTS, objects }),
  undo: () => dispatch({ type: UNDO_ACTION }),
  redo: () => dispatch({ type: REDO_ACTION }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
