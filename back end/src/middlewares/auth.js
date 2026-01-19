const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const { store } = require("../models/store");

const auth = (roles = []) => (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ success: false, message: "Token ausente" });
  }

  const token = header.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = store.users.find((u) => u.id === decoded.sub);
    if (!user || user.blocked) {
      return res.status(403).json({ success: false, message: "Acesso negado" });
    }
    if (roles.length && !roles.includes(user.role)) {
      return res.status(403).json({ success: false, message: "Permissão insuficiente" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token inválido" });
  }
};

module.exports = { auth };
