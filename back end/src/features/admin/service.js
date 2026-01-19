const { store, createId, now } = require("../../models/store");

const listPendingAds = () =>
  store.ads
    .filter((a) => a.status === "pending")
    .map((a) => ({
      ...a,
      priority: a.budgetDaily >= 150 ? "high" : a.budgetDaily >= 100 ? "medium" : "low"
    }));

const approveAd = ({ adId, adminId, reason }) => {
  const ad = store.ads.find((a) => a.id === adId);
  if (!ad) {
    const error = new Error("Anúncio não encontrado");
    error.status = 404;
    throw error;
  }
  ad.status = "active";
  const log = { id: createId(), adId, adminId, action: "approve", reason, createdAt: now() };
  store.moderationHistory.push(log);
  store.auditLogs.push({ ...log, type: "moderation" });
  return ad;
};

const rejectAd = ({ adId, adminId, reason, comment }) => {
  const ad = store.ads.find((a) => a.id === adId);
  if (!ad) {
    const error = new Error("Anúncio não encontrado");
    error.status = 404;
    throw error;
  }
  ad.status = "expired";
  const log = {
    id: createId(),
    adId,
    adminId,
    action: "reject",
    reason,
    comment: comment || null,
    createdAt: now()
  };
  store.moderationHistory.push(log);
  store.auditLogs.push({ ...log, type: "moderation" });
  return ad;
};

const getModerationHistory = () => store.moderationHistory;

const createBanner = (payload, files) => {
  const file = files?.[0];
  if (!file) {
    const error = new Error("Arquivo obrigatório");
    error.status = 400;
    throw error;
  }
  const banner = {
    id: createId(),
    url: `uploaded://${file.originalname}`,
    order: payload.order || 1,
    targetRoles: payload.targetRoles || ["client"],
    scheduleAt: payload.scheduleAt || null,
    active: true
  };
  store.banners.push(banner);
  return banner;
};

const updateBanner = (bannerId, payload) => {
  const banner = store.banners.find((b) => b.id === bannerId);
  if (!banner) {
    const error = new Error("Banner não encontrado");
    error.status = 404;
    throw error;
  }
  Object.assign(banner, payload);
  return banner;
};

const listBanners = () => store.banners;

const listUsers = (filters) => {
  let users = store.users;
  if (filters.role) {
    users = users.filter((u) => u.role === filters.role);
  }
  if (filters.search) {
    const s = filters.search.toLowerCase();
    users = users.filter((u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s));
  }
  return users;
};

const updateUser = (userId, payload) => {
  const user = store.users.find((u) => u.id === userId);
  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.status = 404;
    throw error;
  }
  Object.assign(user, payload);
  store.auditLogs.push({
    id: createId(),
    type: "user",
    action: "update",
    userId,
    payload,
    createdAt: now()
  });
  return user;
};

const createCouponsBulk = ({ adId, count, expiresAt }) => {
  const ad = store.ads.find((a) => a.id === adId);
  if (!ad) {
    const error = new Error("Anúncio não encontrado");
    error.status = 404;
    throw error;
  }
  const coupons = Array.from({ length: count }).map(() => ({
    id: createId(),
    adId,
    userId: null,
    code: `CUPOM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    status: "active",
    redeemedAt: null,
    expiresAt
  }));
  store.coupons.push(...coupons);
  return coupons;
};

const listCoupons = () => store.coupons;

const listAuditLogs = () => store.auditLogs;

const updateAdContent = (adId, payload) => {
  const ad = store.ads.find((a) => a.id === adId);
  if (!ad) {
    const error = new Error("Anúncio não encontrado");
    error.status = 404;
    throw error;
  }
  Object.assign(ad, payload);
  store.auditLogs.push({
    id: createId(),
    type: "ad",
    action: "edit",
    adId,
    payload,
    createdAt: now()
  });
  return ad;
};

module.exports = {
  listPendingAds,
  approveAd,
  rejectAd,
  getModerationHistory,
  createBanner,
  updateBanner,
  listBanners,
  listUsers,
  updateUser,
  createCouponsBulk,
  listCoupons,
  listAuditLogs,
  updateAdContent
};
