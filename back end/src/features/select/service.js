const { store } = require("../../models/store");

const validateAccess = (code) => {
  if (!store.selectAccessCodes.includes(code)) {
    const error = new Error("Código inválido");
    error.status = 401;
    throw error;
  }
  return { valid: true };
};

const getExclusiveContent = () => [
  { id: "ec1", title: "Webinar VIP", type: "video" },
  { id: "ec2", title: "Guia de Negócios", type: "ebook" }
];

const getExclusiveCoupons = () =>
  store.ads
    .filter((ad) => ad.status === "active" && ad.couponCode && ad.tags.includes("tech"))
    .map((ad) => ({
      adId: ad.id,
      title: ad.title,
      couponCode: ad.couponCode,
      expiresAt: ad.couponExpiresAt
    }));

const getEvents = () => [
  { id: "ev1", title: "Evento Fechado", date: "2026-02-10", access: "select" }
];

const getBenefits = () => ({
  coupons: "exclusivos",
  priorityDiscounts: true,
  vipSupport: true
});

module.exports = {
  validateAccess,
  getExclusiveContent,
  getExclusiveCoupons,
  getEvents,
  getBenefits
};
