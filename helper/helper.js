/**
 * Logic Pagination
 * @param {integer} page
 * @param {integer} limit
 * @param {integer} total
 * @returns {object} returns object
 */

const pagination = (page, limit, total) => {
    // if page and limit doesnt exist
    if (!page) {
        page = 1;
    }
    if (!limit) {
        limit = total;
    }

    const pageCount = Math.ceil(total / limit);
    if (page > pageCount) {
        page = pageCount;
    }
    const totalData = total;
    const offset = (page - 1) * limit;

    return {
        offset,
        page,
        limit,
        totalData,
        pageCount,
    };
};

module.exports = { pagination };
