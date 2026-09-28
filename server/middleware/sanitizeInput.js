// ==========================================
// SANITIZE INPUT
// ==========================================
// Strips MongoDB operator keys ("$gt", "a.b") from the request
// body so user input can never be turned into a query operator.
// ==========================================

const isPlainObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const clean = (value) => {
  if (Array.isArray(value)) {
    return value.map(clean);
  }

  if (isPlainObject(value)) {
    const result = {};

    for (const [key, nested] of Object.entries(value)) {
      if (key.startsWith("$") || key.includes(".")) continue;
      result[key] = clean(nested);
    }

    return result;
  }

  return value;
};

const sanitizeInput = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = clean(req.body);
  }

  next();
};

module.exports = sanitizeInput;
