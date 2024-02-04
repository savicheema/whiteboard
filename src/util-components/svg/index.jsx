import React from "react";

const svgns = "http://www.w3.org/2000/svg";

export const SquareSvg = () => {
  const svgRef = React.useRef(null);
  const squareSvgEl = React.useMemo(() => {
    let newPath = document.createElementNS(svgns, "path");
    newPath.setAttribute(
      "d",
      "M 0 0 h 2.8 v 0.9 h -2.8 v -0.9 l 0.1 0.1 v 0.9 h 2.8 v -0.9 h -2.8 Z"
    );
    newPath.setAttribute("fill", "currentColor");
    return newPath;
  }, []);

  React.useEffect(() => {
    const container = svgRef.current;
    container.appendChild(squareSvgEl);

    return () => {
      container.removeChild(squareSvgEl);
    };
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <svg ref={svgRef} viewBox="0 0 3 1" height="12px" width="36px"></svg>
    </div>
  );
};

export const LineSvg = () => {
  const svgRef = React.useRef(null);
  const squareSvgEl = React.useMemo(() => {
    let newPath = document.createElementNS(svgns, "path");
    newPath.setAttribute(
      "d",
      "M 0 0 l 2.8 1 l 0.3 0.3 l -2.8 -1 l -0.3 -0.3 z"
    );

    newPath.setAttribute("fill", "currentColor");
    return newPath;
  }, []);

  React.useEffect(() => {
    const container = svgRef.current;
    container.appendChild(squareSvgEl);

    return () => {
      container.removeChild(squareSvgEl);
    };
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <svg ref={svgRef} viewBox="0 0 3 1" height="12px" width="36px"></svg>
    </div>
  );
};

export const CircleSvg = ({
  strokeColor = "red",
  fillColor = "transparent",
}) => {
  const svgRef = React.useRef(null);
  const outerCircleSvgEl = React.useMemo(() => {
    let newCirclePath = document.createElementNS(svgns, "circle");
    newCirclePath.setAttribute("cx", "50%");
    newCirclePath.setAttribute("cy", "50%");
    newCirclePath.setAttribute("r", "6");
    newCirclePath.setAttribute("fill", "currentColor");
    // newCirclePath.setAttribute("fill", COLORS["--accent-color"]);
    return newCirclePath;
  }, []);

  const innerCircleSvgEl = React.useMemo(() => {
    let newCirclePath = document.createElementNS(svgns, "circle");
    newCirclePath.setAttribute("cx", "50%");
    newCirclePath.setAttribute("cy", "50%");
    newCirclePath.setAttribute("r", "4");
    newCirclePath.setAttribute("fill", "white");
    return newCirclePath;
  }, []);

  React.useEffect(() => {
    svgRef.current.appendChild(outerCircleSvgEl);
    svgRef.current.appendChild(innerCircleSvgEl);
  }, [outerCircleSvgEl, innerCircleSvgEl]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <svg ref={svgRef} viewBox="0 0 34 10" width="36" height="12"></svg>
    </div>
  );
};
