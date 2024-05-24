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

export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export function debounce(func, delay) {
  let timeoutId;

  return function () {
    const args = arguments;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      func.apply(this, args);
    }, delay);
  };
}

export const makeThrottle = (ignoreCount) => {
  let count = 0;

  console.log("MAKING");
  return (fn, ms) => {
    let locked = true;
    console.log("THROTTLING", count);

    return function () {
      locked = count < ignoreCount ? true : false;
      count++;
      console.log("EXECUTING", count);
      if (!locked) {
        locked = true;
        fn.apply(this, arguments);

        setTimeout(() => {
          // fn.apply(this, arguments);
          locked = false;
        }, ms);
      }
    };
  };
};
