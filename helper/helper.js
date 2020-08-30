/**
 * Hash Password Method
 * @param {integer} page
 * @param {integer} limit
 * @param {array of object} data
 * @returns {object} returns object
 */

const pagination = (page, limit, data) => {
    // if page and limit doesnt exist
    if (!page) {
        page = 1;
    }
    if (!limit) {
        limit = data.length;
    }

    const pageCount = Math.ceil(data.length / limit);
    if (page > pageCount) {
        page = pageCount;
    }
    const totalData = data.length;
    data = data.slice((page * limit) - limit, page * limit);
    return {
        data,
        page,
        limit,
        totalData,
        pageCount,
    };
};

module.exports = { pagination };
