import { connect } from "react-redux";
import {
  REDO_ACTION,
  SET_COLOR,
  SET_OBJECTS,
  SET_SHAPE,
  UNDO_ACTION,
} from "../store/consts";
import { saveAs } from "file-saver";
import { useRef } from "react";
import { LargeSecondaryButton, MediumUtilButton } from "./Buttons";
import "./tool-panel.css";
import UtilSelect from "../util-components/UtilSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faSquare,
  faCircle,
  faEraser,
  faTextWidth,
  faBackward,
  faForward,
} from "@fortawesome/free-solid-svg-icons";

const ToolPanel = ({
  setShape,
  setColor,
  undo,
  redo,
  setDarkMode,
  isDark,
  objects,
  setObjects,
}) => {
  const fileRef = useRef(null);

  const handleLineClicked = () => {
    setShape("line");
  };
  const handlRectangleClicked = () => {
    setShape("rect");
  };
  // const handleTriangleClicked = () => {
  //   setShape("triangle");
  // };

  const handleCircleClicked = () => {
    setShape("circle");
  };
  const handleColorClicked = (evt) => {
    console.log("COLOR", evt);
    if (evt) {
      setColor(evt.target.value);
    }
  };

  const handleEraserClicked = () => {
    setShape("eraser");

    //  document.body.style.cursor = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkAgMAAACcbnALAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAlQTFRFAAAAAAAA////g93P0gAAAAN0Uk5TAP//RFDWIQAAAFxJREFUeJxjYMAOWEMdIAzGqFVTISyxVatWBYBZWUDWErAkkLFqJYjFBmKtAumRArMmQJVBFMJZYA1gLdhYEENAxlDCwm8HNlchuRnhD4TfEP5FCgNEuCDCCg8AAHUsdO0s/5hdAAAAAElFTkSuQmCC) 0 0, default !important";
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
  const exportToJsonFile = (jsonObject) => {
    const jsonString = JSON.stringify(jsonObject);
    const blob = new Blob([jsonString], { type: "application/json" });
    saveAs(blob, "data.json");
  };
  const handleExport = () => {
    exportToJsonFile(objects);
  };

  const handleFileRead = (e) => {
    const content = e.target.result;

    // Do something with the file content
    setObjects(JSON.parse(content));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = handleFileRead;
      reader.readAsText(file);
    }
  };

  const handleImport = (e) => {
    fileRef.current.click();
  };

  return (
    <div className="tool-panel">
      <div className="tool-panel-operations">
        <LargeSecondaryButton onClick={() => setShape("pencil")}>
          <FontAwesomeIcon icon={faPencil} />
        </LargeSecondaryButton>
        <LargeSecondaryButton onClick={handleLineClicked}>
          Line
        </LargeSecondaryButton>
        <LargeSecondaryButton onClick={handlRectangleClicked}>
          <FontAwesomeIcon icon={faSquare} />
        </LargeSecondaryButton>
        <LargeSecondaryButton onClick={handleCircleClicked}>
          <FontAwesomeIcon icon={faCircle} />
        </LargeSecondaryButton>
        <LargeSecondaryButton onClick={handleEraserClicked}>
          <FontAwesomeIcon icon={faEraser} />
        </LargeSecondaryButton>
        <LargeSecondaryButton onClick={handleTextClicked}>
          <FontAwesomeIcon icon={faTextWidth} />
        </LargeSecondaryButton>
        <LargeSecondaryButton onClick={() => undo()}>
          <FontAwesomeIcon icon={faBackward} />
        </LargeSecondaryButton>
        <LargeSecondaryButton onClick={() => redo()}>
          <FontAwesomeIcon icon={faForward} />
        </LargeSecondaryButton>
        <UtilSelect
          options={[
            isDark === "white" ? "black" : "",
            "orange",
            "yellow",
            "red",
            "blue",
            "green",
            "purple",
            isDark === "black" ? "white" : "",
          ].filter((color) => !!color)}
          onChange={handleColorClicked}
          setColor={setColor}
        />
      </div>

      <div className="tool-panel-utils">
        <MediumUtilButton onClick={handleDarkColor}>Dark Mode</MediumUtilButton>
        <MediumUtilButton onClick={handleLightColor}>
          Light Mode
        </MediumUtilButton>
        <MediumUtilButton onClick={handleExport}>
          Save & Export
        </MediumUtilButton>
        <MediumUtilButton onClick={handleImport}>Import</MediumUtilButton>
        <input
          type="file"
          ref={fileRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  shape: state.shape,
  objects: state.objects,
});

const mapDispatchToProps = (dispatch) => ({
  setShape: (shape) => dispatch({ type: SET_SHAPE, shape }),
  undo: () => dispatch({ type: UNDO_ACTION }),
  redo: () => dispatch({ type: REDO_ACTION }),
  setColor: (color) => dispatch({ type: SET_COLOR, color }),
  setObjects: (objects) => dispatch({ type: SET_OBJECTS, objects }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolPanel);
