import React from "react";
import "./util-button.css";

const UtilButton = ({ type, size, children, isDisabled, ...props }) => {
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
    <button
      type="button"
      className={["app-button", type || ""]
        .filter((className) => !!className)
        .join(" ")}
      style={{ ...getSizeStyles(size), ...getDisabledStyles(isDisabled) }}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default UtilButton;
