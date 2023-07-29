import React, { useEffect, useRef } from "react";

const Canvas = () => {


    const canvasRef = useRef(null)
    // const [elements, setElements] = useState([]);
//   const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;

    console.log("component mounted")
 
    // Here you can write additional logic to draw on the canvas

    return () => {
      // Clean up any resources used by the canvas
    //   document.body.removeChild(canvas);
    console.log('component unmounted!')
    };
  }, []);

  return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight * 0.7}/>;
};

export default Canvas;
