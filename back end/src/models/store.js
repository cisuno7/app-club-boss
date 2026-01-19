const { v4: uuid } = require("uuid");

const now = () => new Date().toISOString();

const store = {
  users: [
    { id: "u1", name: "Cliente", email: "cliente@boss.com", role: "client", blocked: false, interests: ["tech", "consultoria"], createdAt: now() },
    { id: "u2", name: "Empresa XYZ", email: "empresa@boss.com", role: "company", blocked: false, interests: ["marketing"], mfaEnabled: true, createdAt: now() },
    { id: "u3", name: "Admin", email: "admin@boss.com", role: "admin", blocked: false, interests: [], createdAt: now() },
    { id: "u4", name: "Select", email: "select@boss.com", role: "select", blocked: false, interests: ["premium", "tech"], createdAt: now() }
  ],
  ads: [
    {
      id: "a1",
      companyId: "u2",
      companyName: "Empresa XYZ",
      title: "Desconto em Consultoria",
      description: "Consultoria estratégica com 20% OFF",
      category: "Consultoria",
      tags: ["consultoria", "business"],
      couponCode: "CONSULT20",
      couponExpiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: "active",
      bannerUrls: [],
      scheduleAt: null,
      budgetDaily: 100,
      createdAt: now(),
      views: 1200,
      clicks: 230,
      conversions: 45
    },
    {
      id: "a2",
      companyId: "u2",
      companyName: "Empresa XYZ",
      title: "Plano Tech Pro",
      description: "Serviços tech para empresas",
      category: "Tecnologia",
      tags: ["tech", "software"],
      couponCode: "TECH15",
      couponExpiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      status: "pending",
      bannerUrls: [],
      scheduleAt: null,
      budgetDaily: 150,
      createdAt: now(),
      views: 900,
      clicks: 140,
      conversions: 20
    }
  ],
  coupons: [
    {
      id: "c1",
      adId: "a1",
      userId: "u1",
      code: "CONSULT20",
      status: "active",
      redeemedAt: null,
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  banners: [
    { id: "b1", url: "https://via.placeholder.com/800x200", order: 1, targetRoles: ["client"], scheduleAt: null, active: true }
  ],
  contacts: [],
  moderationHistory: [],
  auditLogs: [],
  seenAds: {},
  selectAccessCodes: ["SELECT-2026", "VIP-0001"]
};

const createId = () => uuid();

module.exports = { store, createId, now };
