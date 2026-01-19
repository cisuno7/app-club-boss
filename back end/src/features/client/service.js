const { store, createId } = require("../../models/store");
const { getPagination, buildPaginationResponse } = require("../../utils/pagination");
const { calcRelevance } = require("../../utils/relevance");

const getFeed = (params) => {
  const { userId, interests, category, search, page, limit } = params;
  const user = userId ? store.users.find((u) => u.id === userId) : null;
  const interestList = interests && interests.length ? interests : (user?.interests || []);

  const now = Date.now();
  const seenForUser = store.seenAds[userId] || {};

  let ads = store.ads.filter((ad) => ad.status === "active");

  if (category) {
    ads = ads.filter((ad) => ad.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const s = search.toLowerCase();
    ads = ads.filter(
      (ad) => ad.title.toLowerCase().includes(s) || ad.description.toLowerCase().includes(s)
    );
  }

  ads = ads.filter((ad) => {
    const lastSeen = seenForUser[ad.id];
    return !lastSeen || now - lastSeen > 24 * 60 * 60 * 1000;
  });

  ads = ads.map((ad) => {
    const daysOld = Math.floor((now - new Date(ad.createdAt).getTime()) / (24 * 60 * 60 * 1000));
    const relevance = calcRelevance({ ...ad, daysOld }, interestList);
    return { ...ad, relevance };
  });

  ads.sort((a, b) => b.relevance - a.relevance);

  const pagination = getPagination({ page, limit });
  const items = ads.slice(pagination.offset, pagination.offset + pagination.limit);

  if (userId) {
    const updated = { ...seenForUser };
    items.forEach((ad) => {
      updated[ad.id] = now;
    });
    store.seenAds[userId] = updated;
  }

  return buildPaginationResponse(items, ads.length, pagination.page, pagination.limit);
};

const getAvailableCoupons = (userId) => {
  const redeemedIds = store.coupons.filter((c) => c.userId === userId).map((c) => c.adId);
  return store.ads
    .filter((ad) => ad.status === "active" && ad.couponCode)
    .filter((ad) => !userId || !redeemedIds.includes(ad.id))
    .map((ad) => ({
      adId: ad.id,
      companyName: ad.companyName,
      title: ad.title,
      couponCode: ad.couponCode,
      expiresAt: ad.couponExpiresAt
    }));
};

const redeemCoupon = (userId, adId) => {
  const ad = store.ads.find((a) => a.id === adId);
  if (!ad || ad.status !== "active") {
    const error = new Error("Anúncio inválido");
    error.status = 404;
    throw error;
  }

  const userCoupons = store.coupons.filter((c) => c.userId === userId);
  if (userCoupons.length >= 5) {
    const error = new Error("Limite de resgates atingido");
    error.status = 400;
    throw error;
  }

  const existing = userCoupons.find((c) => c.adId === adId);
  if (existing) {
    const error = new Error("Cupom já resgatado");
    error.status = 400;
    throw error;
  }

  const coupon = {
    id: createId(),
    adId,
    userId,
    code: ad.couponCode,
    status: "active",
    redeemedAt: new Date().toISOString(),
    expiresAt: ad.couponExpiresAt
  };
  store.coupons.push(coupon);
  return coupon;
};

const getCouponHistory = (userId) => {
  return store.coupons.filter((c) => c.userId === userId);
};

const createContact = ({ userId, channel, message, adId }) => {
  const contact = {
    id: createId(),
    userId,
    adId: adId || null,
    channel,
    status: "open",
    history: [{ at: new Date().toISOString(), message }]
  };
  store.contacts.push(contact);
  return contact;
};

module.exports = {
  getFeed,
  getAvailableCoupons,
  redeemCoupon,
  getCouponHistory,
  createContact
};
