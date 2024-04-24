import React from "react";
import { connect } from "react-redux";
import {
  REDO_ACTION,
  SET_COLOR,
  SET_OBJECTS,
  SET_SHAPE,
  UNDO_ACTION,
  SET_SIZE,
} from "../store/consts";
import { saveAs } from "file-saver";
import { useRef, useMemo, useState } from "react";
import {
  LargeSecondaryButton,
  MediumUtilButton,
  MediumUtilButtonMobile,
} from "./Buttons";
import "./tool-panel.css";
import UtilSelect from "../util-components/UtilSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEraser,
  faBackward,
  faForward,
  faFileImport,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { CircleSvg, LineSvg, SquareSvg, TextSvg } from "../util-components/svg";

const ToolPanel = ({
  setShape,
  setColor,
  undo,
  redo,
  setDarkMode,
  isDark,
  objects,
  setObjects,
  setSize,
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
    if (evt) {
      setColor(evt.target.value);
    }
  };

  const handleSizeSelect = (evt) => {
    if (evt) {
      setSize(evt.target.value);
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

  const colorOptionComponent = ({ value }) => (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: `${value}`,
        marginLeft: "8px",
      }}
    >
      &nbsp;
    </div>
  );

  const sizeOptionComponent = ({ value }) => (
    <div
      style={{
        width: `${value * 5}px`,
        height: `${value * 5}px`,
        borderRadius: "50%",
        backgroundColor: "black",
        marginLeft: "8px",
      }}
    >
      &nbsp;
    </div>
  );

  const colorOptions = useMemo(
    () =>
      [
        isDark === "white" ? "black" : "",
        "orange",
        "yellow",
        "red",
        "blue",
        "green",
        "purple",
        isDark === "black" ? "white" : "",
      ].filter((color) => !!color),
    [isDark]
  );

  const sizeOptions = useMemo(() => [1, 2, 4], []);

  const [isShow, setIsShow] = useState(true);

  return (
    <div className="tool-panel">
      <MediumUtilButtonMobile
        onClick={() => {
          setIsShow((isShow) => !isShow);
        }}
      >
        Toggle collapse
      </MediumUtilButtonMobile>
      {isShow && (
        <div className="tool-panel-operations">
          <LargeSecondaryButton onClick={() => setShape("pencil")}>
            <FontAwesomeIcon icon={faPencil} />
          </LargeSecondaryButton>
          <LargeSecondaryButton onClick={handleLineClicked}>
            <LineSvg />
          </LargeSecondaryButton>

          <LargeSecondaryButton onClick={handlRectangleClicked}>
            <SquareSvg />
          </LargeSecondaryButton>

          <LargeSecondaryButton onClick={handleCircleClicked}>
            <CircleSvg />
          </LargeSecondaryButton>
          <LargeSecondaryButton onClick={handleEraserClicked}>
            <FontAwesomeIcon icon={faEraser} />
          </LargeSecondaryButton>
          <LargeSecondaryButton onClick={handleTextClicked}>
            {/* <FontAwesomeIcon icon={faTextWidth} /> */}
            <TextSvg />
          </LargeSecondaryButton>
          <LargeSecondaryButton onClick={() => undo()}>
            <FontAwesomeIcon icon={faBackward} />
          </LargeSecondaryButton>
          <LargeSecondaryButton onClick={() => redo()}>
            <FontAwesomeIcon icon={faForward} />
          </LargeSecondaryButton>
          <UtilSelect
            options={colorOptions}
            onChange={handleColorClicked}
            setState={setColor}
            optionComponent={colorOptionComponent}
          />
          <UtilSelect
            options={sizeOptions}
            onChange={handleSizeSelect}
            setState={setSize}
            optionComponent={sizeOptionComponent}
          />
        </div>
      )}

      <div className="tool-panel-utils">
        <MediumUtilButton
          onClick={() => {
            if (isDark === "white") handleDarkColor();
            if (isDark === "black") handleLightColor();
          }}
        >
          {isDark === "black" && "Light Mode"}
          {isDark === "white" && "Dark Mode"}
        </MediumUtilButton>
        {/* <MediumUtilButton onClick={handleLightColor}>
          Light Mode
        </MediumUtilButton> */}
        <MediumUtilButton onClick={handleExport}>
          <FontAwesomeIcon icon={faFileExport} />
        </MediumUtilButton>
        <MediumUtilButton onClick={handleImport}>
          <FontAwesomeIcon icon={faFileImport} />
        </MediumUtilButton>
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
  setSize: (size) => dispatch({ type: SET_SIZE, size }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolPanel);
