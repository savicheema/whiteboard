import React from "react";

const svgns = "http://www.w3.org/2000/svg";

export const SquareSvg = () => {
  const svgRef = React.useRef(null);
  const squareSvgEl = React.useMemo(() => {
    let newPath = document.createElementNS(svgns, "rect");
    newPath.setAttribute("x", "0.1");
    newPath.setAttribute("y", "0.1");
    newPath.setAttribute("width", "2.8");
    newPath.setAttribute("height", "0.8");
    newPath.setAttribute("rx", "0.1");
    newPath.setAttribute("ry", "0.1");
    newPath.setAttribute("stroke", "currentColor");
    newPath.setAttribute("stroke-width", "0.15");
    newPath.setAttribute("fill", "transparent");
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
    let newPath = document.createElementNS(svgns, "line");
    newPath.setAttribute("x1", "0.05");
    newPath.setAttribute("y1", "0.05");
    newPath.setAttribute("x2", "2.9");
    newPath.setAttribute("y2", "0.9");
    newPath.setAttribute("stroke", "currentColor");
    newPath.setAttribute("stroke-width", "0.15");

    // newPath.setAttribute("fill", "currentColor");
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
    newCirclePath.setAttribute("r", "0.35");
    newCirclePath.setAttribute("stroke", "currentColor");
    newCirclePath.setAttribute("stroke-width", "0.125");
    newCirclePath.setAttribute("fill", "transparent");
    return newCirclePath;
  }, []);

  React.useEffect(() => {
    svgRef.current.appendChild(outerCircleSvgEl);
  }, [outerCircleSvgEl]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <svg ref={svgRef} viewBox="0 0 3 1" width="48" height="16"></svg>
    </div>
  );
};

export const TextSvg = ({ strokeColor = "red", fillColor = "transparent" }) => {
  const svgRef = React.useRef(null);
  const textSvgEl = React.useMemo(() => {
    let textPath = document.createElementNS(svgns, "path");
    textPath.setAttribute("d", "M0.65 0H2.35V0.3H1.75V1H1.25V0.3H0.6Z");
    textPath.setAttribute("fill", "currentColor");
    return textPath;
  }, []);

  React.useEffect(() => {
    svgRef.current.appendChild(textSvgEl);
    // svgRef.current.appendChild(innerCircleSvgEl);
  }, [textSvgEl]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <svg ref={svgRef} viewBox="0 0 3 1" width="36" height="12"></svg>
    </div>
  );
};

export const SketchSvg = ({
  strokeColor = "red",
  fillColor = "transparent",
}) => {
  const svgRef = React.useRef(null);
  const textSvgEl = React.useMemo(() => {
    let textPath = document.createElementNS(svgns, "path");
    textPath.setAttribute("d", "M3 0Q3.8 0.2 3 0.8L0.5 1Q-0.5 0.8 0.4 0.2Z");
    textPath.setAttribute("fill", "currentColor");
    return textPath;
  }, []);

  React.useEffect(() => {
    svgRef.current.appendChild(textSvgEl);
    // svgRef.current.appendChild(innerCircleSvgEl);
  }, [textSvgEl]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <svg ref={svgRef} viewBox="0 0 3 1" width="48" height="12"></svg>
    </div>
  );
};
