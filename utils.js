const Action = require("./Action");

const disallowedValues = [
  "[not provided]",
  "placeholder",
  "[[unknown]]",
  "not set",
  "not provided",
  "unknown",
  "undefined",
  "n/a",
];

const filterNullValuesFromObject = (object) =>
  Object.fromEntries(
    Object.entries(object).filter(
      ([_, v]) =>
        v !== null &&
        v !== "" &&
        typeof v !== "undefined" &&
        (typeof v !== "string" ||
          !disallowedValues.includes(v.toLowerCase()) ||
          !v.toLowerCase().includes("!$record")),
    ),
  );

const normalizePropertyName = (key) =>
  key
    .toLowerCase()
    .replace(/__c$/, "")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");

const goal = async (actions) => {
  await Promise.all(
    actions.map((action) => {
      const act = new Action(action);
      act.save();
    }),
  );
};

module.exports = {
  filterNullValuesFromObject,
  normalizePropertyName,
  goal,
};
