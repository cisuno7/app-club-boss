const getPagination = (query = {}) => {
  const page = Math.max(parseInt(query.page || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(query.limit || "10", 10), 1), 50);
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

const buildPaginationResponse = (items, total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  return {
    items,
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1
  };
};

module.exports = { getPagination, buildPaginationResponse };
