const env = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || "boss-secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "boss-refresh-secret",
  tokenExpiresIn: "24h",
  refreshExpiresIn: "30d",
  rateLimitWindowMs: 15 * 60 * 1000,
  rateLimitMax: 300
};

module.exports = { env };
