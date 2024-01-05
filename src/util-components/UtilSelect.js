import React from "react";
import "./util-select.css";

const UtilSelectOptions = ({
  options,
  option,
  visibleOptions,
  setVisibleOptions,
  refsObject,
  size,
}) => {
  const [isShow, setIsShow] = React.useState(false);
  const getSizeStyles = (size) => {
    switch (size) {
      case "large": {
        return { padding: "8px", margin: "4px", borderRadius: "4px" };
      }

      case "small": {
        return { padding: "2px", margin: "1px", borderRadius: "1px" };
      }
      case "medium":
      default: {
        return { padding: "5px 4px", margin: "2px", borderRadius: "2px" };
      }
    }
  };
  if (visibleOptions != option) return null;
  return (
    <div className="util-app-select-options">
      <div
        className="app-selected"
        onClick={() => {
          //   setVisibleOptions(option);
          setIsShow((isShow) => !isShow);
        }}
        style={{ ...getSizeStyles(size) }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: `${option}`,
            marginLeft: "8px",
          }}
        >
          &nbsp;
        </div>
      </div>
      {isShow && visibleOptions === option && (
        <div className="app-select-options">
          {options.map((option) => (
            <div
              key={option}
              className="app-select-option"
              onClick={() => {
                // update original select box with this option
                console.log(refsObject[option]);
                refsObject[option].current.click();
                setIsShow(false);
              }}
              style={option === "white" ? { backgroundColor: "black" } : {}}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: `${option}`,
                  marginLeft: "8px",
                }}
              >
                &nbsp;
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const UtilSelect = ({ size, type, options, setColor, ...props }) => {
  const [visibleOptions, setVisibleOptions] = React.useState(options[0]);
  const refsObject = Object.fromEntries(
    options.map((option) => [option, React.createRef()])
  );
  console.log("on change", props.onChange);

  React.useEffect(() => {
    setColor(visibleOptions);
  }, [visibleOptions]);

  return (
    <div className="app-select-container" style={{ maxWidth: "108px" }}>
      <select className="app-select" onChange={() => {}} value={visibleOptions}>
        {options.map((option, index) => (
          <option
            key={index}
            ref={refsObject[option]}
            onClick={() => {
              setVisibleOptions(option);
            }}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
      {options.map((option) => (
        <UtilSelectOptions
          options={options}
          key={option}
          option={option}
          visibleOptions={visibleOptions}
          setVisibleOptions={setVisibleOptions}
          refsObject={refsObject}
          size={size}
        />
      ))}
    </div>
  );
};

export default UtilSelect;
