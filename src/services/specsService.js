const axios = require('axios');

const CAR_SPECS_BASE_URL =
    process.env.CAR_SPECS_BASE_URL;

async function searchVehiclesSpecs(searchText) {
    if (!searchText) return null;

    const res = await axios.get(`${CAR_SPECS_BASE_URL}/api/search`, {
        params: {
            search: searchText,
            limit: 1
        }
    });

    if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data[0];
    }

    return null;
}

module.exports = {
    searchVehiclesSpecs
};