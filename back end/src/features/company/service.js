const { store, createId, now } = require("../../models/store");

const createAd = (payload) => {
  const ad = {
    id: createId(),
    companyId: payload.companyId,
    companyName: payload.companyName || "Empresa",
    title: payload.title,
    description: payload.description,
    category: payload.category,
    tags: payload.tags || [],
    status: "pending",
    bannerUrls: [],
    scheduleAt: payload.scheduleAt || null,
    budgetDaily: payload.budgetDaily,
    createdAt: now(),
    views: 0,
    clicks: 0,
    conversions: 0
  };
  store.ads.push(ad);
  return ad;
};

const listAds = (companyId, status) => {
  let ads = store.ads.filter((a) => a.companyId === companyId);
  if (status) {
    ads = ads.filter((a) => a.status === status);
  }
  return ads;
};

const updateAd = (adId, payload) => {
  const ad = store.ads.find((a) => a.id === adId);
  if (!ad) {
    const error = new Error("Anúncio não encontrado");
    error.status = 404;
    throw error;
  }
  Object.assign(ad, payload);
  return ad;
};

const uploadBanners = (adId, files) => {
  const ad = store.ads.find((a) => a.id === adId);
  if (!ad) {
    const error = new Error("Anúncio não encontrado");
    error.status = 404;
    throw error;
  }
  const urls = files.map((f) => `uploaded://${f.originalname}`);
  ad.bannerUrls.push(...urls);
  return ad;
};

const getMetrics = (companyId) => {
  const ads = store.ads.filter((a) => a.companyId === companyId);
  const views = ads.reduce((acc, a) => acc + a.views, 0);
  const clicks = ads.reduce((acc, a) => acc + a.clicks, 0);
  const conversions = ads.reduce((acc, a) => acc + a.conversions, 0);
  const budget = ads.reduce((acc, a) => acc + a.budgetDaily, 0);
  const roi = budget > 0 ? ((conversions * 10 - budget) / budget) * 100 : 0;
  return { views, clicks, conversions, roi: Number(roi.toFixed(2)) };
};

const exportReport = (companyId, type = "summary") => {
  return {
    companyId,
    type,
    url: `https://reports.boss.local/${companyId}/${type}.csv`
  };
};

module.exports = {
  createAd,
  listAds,
  updateAd,
  uploadBanners,
  getMetrics,
  exportReport
};
