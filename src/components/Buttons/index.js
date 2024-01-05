import UtilButton from "../../util-components/UtilButton";

const partiallyApply = (Component, partialProps) => (props) =>
  <Component {...partialProps} {...props} />;

export const MediumUtilButton = partiallyApply(UtilButton, {
  type: "util",
  size: "medium",
});

export const LargeUtilButton = partiallyApply(UtilButton, {
  type: "util",
  size: "large",
});

export const LargeSecondaryButton = partiallyApply(UtilButton, {
  type: "secondary",
  size: "large",
});

export const MediumUtilButtonMobile = partiallyApply(UtilButton, {
  type: "util",
  size: "medium",
  screen: "mobile",
});
