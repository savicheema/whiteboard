import React from "react";
import "./util-button.css";

const UtilButton = ({
  type,
  size,
  children,
  isDisabled,
  screen,
  tooltip,
  ...props
}) => {
  const [isHover, setIsHover] = React.useState(false);
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

  const getDisabledStyles = (isDisabled) => {
    if (isDisabled) {
      return { opacity: 0.5 };
    } else {
      return { opacity: 1 };
    }
  };
  return (
    <>
      <button
        type="button"
        className={["app-button", type || "", screen || ""]
          .filter((className) => !!className)
          .join(" ")}
        style={{ ...getSizeStyles(size), ...getDisabledStyles(isDisabled) }}
        disabled={isDisabled}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        {...props}
      >
        {children}
      </button>
      {tooltip && isHover && (
        <div
          style={{
            height: "1px",
            width: "1px",
            float: "right",
            position: "relative",
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
    </>
  );
};

export default UtilButton;
