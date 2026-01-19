const jwt = require("jsonwebtoken");
const { store } = require("../../models/store");
const { env } = require("../../config/env");

const signTokens = (user) => {
  const accessToken = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, {
    expiresIn: env.tokenExpiresIn
  });
  const refreshToken = jwt.sign({ sub: user.id }, env.jwtRefreshSecret, {
    expiresIn: env.refreshExpiresIn
  });
  return { accessToken, refreshToken };
};

const login = (email, password) => {
  const user = store.users.find((u) => u.email === email);
  if (!user || user.blocked) {
    const error = new Error("Credenciais inválidas");
    error.status = 401;
    throw error;
  }
  // senha mockada
  const mfaRequired = user.role === "company" && user.mfaEnabled;
  return { user, mfaRequired, ...signTokens(user) };
};

const refresh = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, env.jwtRefreshSecret);
    const user = store.users.find((u) => u.id === decoded.sub);
    if (!user) {
      const error = new Error("Refresh token inválido");
      error.status = 401;
      throw error;
    }
    return signTokens(user);
  } catch (error) {
    const err = new Error("Refresh token inválido");
    err.status = 401;
    throw err;
  }
};

module.exports = { login, refresh };
