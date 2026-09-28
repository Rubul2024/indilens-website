// Kept for backwards compatibility; all admin routes share one middleware.
const { protect } = require("./authMiddleware");

module.exports = protect;
