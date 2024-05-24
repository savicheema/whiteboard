import React, { useCallback } from "react";
import "./util-select.css";
import { makeThrottle } from "../utils";

const UtilSelectOptions = ({
  options,
  visibleOptions,
  refsObject,
  size,
  optionComponent: OptionComponent,
  tooltip,
}) => {
  const [isHover, setIsHover] = React.useState(false);
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
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
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
      {tooltip && isHover && (
        <div
          style={{
            height: "1px",
            width: "1px",
            float: "right",
            position: "absolute",
            top: "-4px",
            right: "0",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "100%",
              right: "0",
              height: "24px",
              minWidth: "48px",
              backgroundColor: "black",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 4px",
              borderRadius: "4px",
            }}
          >
            {tooltip}
          </div>
        </div>
      )}
    </div>
  );
};

const throttle = makeThrottle(process.env.NODE_ENV === "development" ? 6 : 3);
const optionChangedThrottled = throttle((setState, visibleOptions) => {
  // console.log("THROTTLED", setState, visibleOptions, process.env.NODE_ENV);
  setState && setState(visibleOptions);
}, 400);

const UtilSelect = ({
  size,
  type,
  options,
  setState,
  optionComponent,
  tooltip,
  ...props
}) => {
  const allOptions = React.useMemo(() => options, [options]);
  const [visibleOptions, setVisibleOptions] = React.useState(allOptions[0]);
  const refsObject = Object.fromEntries(
    allOptions.map((option) => [option, React.createRef()])
  );

  const optionChangedThrottledCallback = useCallback(optionChangedThrottled);

  React.useEffect(() => {
    optionChangedThrottledCallback(setState, visibleOptions);
  }, [visibleOptions, setState]);

  return (
    <div className="app-select-container">
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
      <UtilSelectOptions
        options={allOptions}
        {...{
          tooltip,
          optionComponent,
          size,
          refsObject,
          setVisibleOptions,
          visibleOptions,
        }}
      />
    </div>
  );
};

export default UtilSelect;
