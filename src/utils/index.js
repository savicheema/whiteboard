export const getColors = () => {
  return Array.from(document.styleSheets)
    .filter(
      (sheet) =>
        sheet.href === null || sheet.href.startsWith(window.location.origin)
    )
    .reduce(
      (acc, sheet) =>
        (acc = [
          ...acc,
          ...Array.from(sheet.cssRules).reduce(
            (def, rule) =>
              (def =
                rule.selectorText === ":root"
                  ? [
                      ...def,
                      ...Array.from(rule.style).filter((name) =>
                        name.startsWith("--")
                      ),
                    ]
                  : def),
            []
          ),
        ]),
      []
    );
};
export const getColorValues = () => {
  const allCSSVars = getColors();
  const element = document.body;
  var elStyles = window.getComputedStyle(element);
  var cssVars = {};
  for (var i = 0; i < allCSSVars.length; i++) {
    let key = allCSSVars[i];
    let value = elStyles.getPropertyValue(key);
    if (value) {
      cssVars[key] = value;
    }
  }
  return cssVars;
};
