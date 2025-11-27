const axios = require('axios');

const FIPE_BASE_URL =
  process.env.FIPE_BASE_URL || 'https://parallelum.com.br/fipe/api/v1';

const VEHICLE_TYPE = 'carros';

async function getBrands() {
  const url = `${FIPE_BASE_URL}/${VEHICLE_TYPE}/marcas`;
  console.log('[FIPE] GET', url);

  const res = await axios.get(url);
  return res.data;
}

async function getModels(brandCode) {
  const url = `${FIPE_BASE_URL}/${VEHICLE_TYPE}/marcas/${brandCode}/modelos`;
  console.log('[FIPE] GET', url);

  const res = await axios.get(url);
  return res.data;
}

async function getYears(brandCode, modelCode) {
  const url = `${FIPE_BASE_URL}/${VEHICLE_TYPE}/marcas/${brandCode}/modelos/${modelCode}/anos`;
  console.log('[FIPE] GET', url);

  const res = await axios.get(url);
  return res.data;
}

async function getPrice(brandCode, modelCode, yearCode) {
  const url = `${FIPE_BASE_URL}/${VEHICLE_TYPE}/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`;
  console.log('[FIPE] GET', url);

  const res = await axios.get(url);
  return res.data;
}

module.exports = {
  getBrands,
  getModels,
  getYears,
  getPrice
};
