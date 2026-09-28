const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");

// ==========================================
// ENSURE ADMIN ACCOUNT
// ==========================================
// Creates the admin account from ADMIN_EMAIL / ADMIN_PASSWORD on first
// start. If ADMIN_PASSWORD is later changed in the environment, the new
// value is applied once; a password changed from the admin panel is kept
// until the environment value changes again.
// ==========================================

let cached = global._ensureAdmin || (global._ensureAdmin = { promise: null });

const syncAdmin = async () => {
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";
  const name = (process.env.ADMIN_NAME || "Indilens Admin").trim();

  if (!email || !password) return;

  const admin = await Admin.findOne({ email }).select("+seedHash");

  if (!admin) {
    const hash = await bcrypt.hash(password, 12);

    await Admin.create({
      name,
      email,
      password: hash,
      seedHash: await bcrypt.hash(password, 12),
    });

    console.log(`Admin account created for ${email}`);
    return;
  }

  const alreadyApplied =
    admin.seedHash && (await bcrypt.compare(password, admin.seedHash));

  if (alreadyApplied) return;

  admin.password = await bcrypt.hash(password, 12);
  admin.seedHash = await bcrypt.hash(password, 12);
  admin.passwordChangedAt = new Date();
  admin.isActive = true;
  await admin.save();

  console.log(`Admin password synced from environment for ${email}`);
};

const ensureAdmin = async () => {
  if (!cached.promise) {
    cached.promise = syncAdmin().catch((error) => {
      // Never block the API on this; retry on the next request
      cached.promise = null;
      console.error("Ensure Admin Error:", error.message);
    });
  }

  return cached.promise;
};

module.exports = ensureAdmin;
