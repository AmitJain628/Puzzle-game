export const isBrowser = (() => {
  let browser = false;
  try {
    if (!!window && !!document && !!document.location) {
      browser = true;
    }
  } catch (e) {
    logError(e);
  }

  return browser;
})();

export const isObj = (obj: object) => obj instanceof Object && obj !== null;

export const deepMergeObj = (target: object, source: object) => {
  if (!isObj(target)) {
    return source;
  }
  for (const key of Object.keys(target)) {
    if (source[key] !== undefined) {
      target[key] = deepMergeObj(target[key], source[key]);
    }
  }

  return target;
};

export function noopFn(): void {
  // This is a noop function
}

// tslint:disable-next-line:no-any
export function logError(...error: any): void {
  // tslint:disable-next-line:no-console
  console.error(...error);
}

/** USED ON PROLONGATION */
export const hexToRgbA = (hex: string, alpha: string | number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return alpha ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgba(${r}, ${g}, ${b})`;
};
