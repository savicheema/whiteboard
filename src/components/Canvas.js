import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { SET_OBJECTS, UNDO_ACTION, REDO_ACTION } from "../store/consts";

const Canvas = ({ shape, color, objects, setObjects, isDark, undo, redo }) => {
  // const [bgColor, setBgColor] = useState("white")
  const canvasRef = useRef(null);
  const drawingState = useRef("");
  const lastMousePosition = useRef({ x: 0, y: 0 });

  const calcDistance = (x1, y1, x2, y2) => {
    let distance = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
    return distance;
  } 
  const drawObjectsOnCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    objects.forEach((object) => {
      ctx.globalCompositeOperation = "source-over";
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
          console.log(object)
          console.log("circle");
          ctx.beginPath();
          ctx.strokeStyle = object.color;
          ctx.lineWidth = 2;
          let radius = calcDistance(object.pts[0].x, object.pts[1].x, object.pts[0].y, object.pts[1].y);
          ctx.arc(object.pts[0].x, object.pts[0].y, radius, 0, 2 * Math.PI, false);
          ctx.stroke();
          break;
          // let x = Math.min(object.pts[0].x, object.pts[1].x);
          // let y = Math.min(object.pts[0].y, object.pts[1].y);
          // let width = Math.abs(object.pts[0].x - object.pts[1].x);
          // let height = Math.abs(object.pts[0].y - object.pts[1].y);
          // ctx.strokeRect(x, y, width, height);
        case "text":
          ctx.fillStyle = object.color;
          let metrics = ctx.measureText(object.text);
          console.log(metrics.width);
          ctx.fillText("hello", object.pts[0].x, object.pts[0].y);
          ctx.beginPath();
          ctx.moveTo(object.pts[0].x + metrics.width, object.pts[0].y - 10);
          ctx.lineTo(object.pts[0].x + metrics.width, object.pts[0].y);
          ctx.stroke();
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
  };

  useEffect(() => {
    console.log("shape changed", shape);
  }, [shape]);

  useEffect(() => {
    drawObjectsOnCanvas();
  }, [objects]);

  const handleMouseDown = (e) => {
    console.log(e, shape);
    drawingState.current = "draw";
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
    objects.push({
      shape,
      color,
      text: "",
      pts: [
        { x: e.clientX, y: e.clientY },
        { x: e.clientX, y: e.clientY },
      ],
    });
    setObjects([...objects]);
  };
  const handleMouseMove = (e) => {
    if (drawingState.current === "draw") {
      if (shape === "pencil" || shape === "eraser") {
        objects[objects.length - 1].pts.push({ x: e.clientX, y: e.clientY });
      } else {
        objects[objects.length - 1].pts[1] = { x: e.clientX, y: e.clientY };
      }
      setObjects([...objects]);
    }
  };

  const handleMouseUp = () => {
    drawingState.current = "";
  };

  const handleKeyDown = (event) => {
    // console.log(e.key);
    if (event.ctrlKey && (event.key === 'z' || event.code === 'KeyZ')) {
      // Perform the Undo operation here
      undo();
      event.preventDefault(); // Prevent the default "undo" action of the browser
    }
    if (event.ctrlKey && (event.key === 'y' || event.code === 'KeyY')) {
      // Perform the Undo operation here
      redo();
      event.preventDefault(); // Prevent the default "undo" action of the browser
    }
    
    
  };
  console.log(isDark, "isDark");
  return (
    <div>
      <canvas
        style={{ backgroundColor: isDark }}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        tabIndex="0"
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight * 0.8}
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
  undo: () => dispatch({type: UNDO_ACTION}),
  redo: () => dispatch({type: REDO_ACTION})
});

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
