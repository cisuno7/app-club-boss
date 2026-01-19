const calcRelevance = (ad, interests = []) => {
  const interestHits = interests.filter((i) => ad.tags.includes(i)).length;
  const recencyScore = Math.max(0, 30 - ad.daysOld);
  const engagementScore = Math.min(ad.clicks, 100) / 10;
  return interestHits * 5 + recencyScore + engagementScore;
};

module.exports = { calcRelevance };
