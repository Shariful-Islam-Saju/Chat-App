const escape = function (str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};

export default escape