import { connect } from "react-redux";
import {
  REDO_ACTION,
  SET_COLOR,
  SET_OBJECTS,
  SET_SHAPE,
  UNDO_ACTION,
} from "../store/consts";

const ToolPanel = ({ setShape, setColor, undo, redo, setDarkMode, isDark, objects, setObjects }) => {
  const handleLineClicked = () => {
    setShape("line");
  };
  const handlRectangleClicked = () => {
    setShape("rect");
  };
  const handleTriangleClicked = () => {
    setShape("triangle");
  };

  const handleCircleClicked = () => {
    setShape("circle");
  };
  const handleColorClicked = (evt) => {
    if (evt) {
      setColor(evt.target.value);
    }
  };
  const handleEraserClicked = () => {
    setShape("eraser");
    document.body.style.cursor = "url(path/to/eraser-cursor.png), pointer";
  };
  const handleTextClicked = () => {
    setShape("text");
  };

  const handleDarkColor = () => {
    setDarkMode("black");
    setObjects([...objects]);
  };
  const handleLightColor = () => {
    setDarkMode("white");
    setObjects([...objects]);
  };

  return (
    <div>
      <button onClick={() => setShape("pencil")}>Pencil</button>
      <button onClick={handleLineClicked}>Line</button>
      <button onClick={handlRectangleClicked}>Rectangle</button>
      <button onClick={handleTriangleClicked}>Triangle</button>
      <button onClick={handleCircleClicked}>Circle</button>
      {/* <button onClick={ handleColorClicked }>Color</button> */}
      <button onClick={handleEraserClicked}>Eraser</button>
      <button onClick={handleTextClicked}>Text</button>
      <button onClick={() => undo()}>Undo</button>
      <button onClick={() => redo()}>Redo</button>
      <select onChange={handleColorClicked}>
        {console.log(isDark)}
        {isDark === "white" && (
          <option style={{ color: "black" }}>black</option>
        )}
        <option style={{ color: "orange" }}>orange</option>
        <option style={{ color: "yellow" }}>yellow</option>
        <option style={{ color: "red" }}>red</option>
        <option style={{ color: "blue" }}>blue</option>
        <option style={{ color: "green" }}>green</option>
        <option style={{ color: "purple" }}>purple</option>
        <option style={{ color: "lavendar" }}>Lavender</option>
        {isDark === "black" && <option style={{ color: "gray" }}>white</option>}
      </select>
      <button onClick={handleDarkColor}>Dark Mode</button>
      <button onClick={handleLightColor}>Light Mode</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  shape: state.shape,
  objects: state.objects
});

const mapDispatchToProps = (dispatch) => ({
  setShape: (shape) => dispatch({ type: SET_SHAPE, shape }),
  undo: () => dispatch({ type: UNDO_ACTION }),
  redo: () => dispatch({ type: REDO_ACTION }),
  setColor: (color) => dispatch({ type: SET_COLOR, color }),
  setObjects: (objects) => dispatch({ type: SET_OBJECTS, objects }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolPanel);
