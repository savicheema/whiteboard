import React from "react";
import "./util-select.css";

const UtilSelectOptions = ({
  options,
  option,
  visibleOptions,
  refsObject,
  size,
  optionComponent: OptionComponent,
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
        <OptionComponent value={visibleOptions} />
      </div>
      {isShow && (
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
              <OptionComponent value={option} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const UtilSelect = ({
  size,
  type,
  options,
  setState,
  optionComponent,
  ...props
}) => {
  const allOptions = React.useMemo(() => options, [options]);
  const [visibleOptions, setVisibleOptions] = React.useState(allOptions[0]);
  const refsObject = Object.fromEntries(
    allOptions.map((option) => [option, React.createRef()])
  );

  React.useEffect(() => {
    setState(visibleOptions);
  }, [visibleOptions, setState]);

  return (
    <div className="app-select-container" style={{ maxWidth: "108px" }}>
      <select className="app-select" onChange={() => {}} value={visibleOptions}>
        {allOptions.map((option, index) => (
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
          options={allOptions}
          key={option}
          option={option}
          visibleOptions={visibleOptions}
          setVisibleOptions={setVisibleOptions}
          refsObject={refsObject}
          size={size}
          optionComponent={optionComponent}
        />
      ))}
    </div>
  );
};

export default UtilSelect;
