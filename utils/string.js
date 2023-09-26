const isString = function (obj) {
  return typeof obj === "string" || obj instanceof String;
};

export const camelCase = (str) => {
  return str
    .toLowerCase()
    .replace(/(_)/g, () => "-")
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

export const camelCaseAll = (obj) => {
  if (isObject(obj)) {
    const n = {};

    Object.keys(obj).forEach((k) => {
      n[camelCase(k)] = camelCaseAll(obj[k]);
    });

    return n;
  } else if (Array.isArray(obj)) {
    return obj.map((i) => {
      return camelCaseAll(i);
    });
  }

  return obj;
};

export const removeQueries = (url) => {
  if (!url) return null;

  return `${url?.substring(0, url.indexOf("?"))}`;
};
