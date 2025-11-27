const fipeService = require('./fipeService');
const specsService = require('./specsService');

async function getCarDetails({ brandCode, modelCode, yearCode, searchText }) {
  console.log('[DETAILS] Params =>', {
    brandCode,
    modelCode,
    yearCode,
    searchText
  });

  let fipeData;
  try {
    fipeData = await fipeService.getPrice(brandCode, modelCode, yearCode);
    console.log('[DETAILS] FIPE OK, CodigoFipe:', fipeData?.CodigoFipe);
  } catch (error) {
    console.error('[DETAILS] Erro ao chamar FIPE:', error.message);

    if (error.response) {
      console.error('[DETAILS] FIPE status:', error.response.status);
      console.error('[DETAILS] FIPE data:', error.response.data);
    }

    throw error;
  }

  let autoSearch = searchText;

  if (!autoSearch && fipeData) {
    const marca = fipeData.Marca || '';
    const modelo = fipeData.Modelo || '';
    const ano = fipeData.AnoModelo || '';

    autoSearch = `${marca} ${modelo} ${ano}`.trim();
  }

  console.log('[DETAILS] autoSearch =>', autoSearch);

  let specs = null;

  if (autoSearch) {
    try {
      specs = await specsService.searchVehicleSpecs(autoSearch);
      console.log('[DETAILS] Specs encontrada?', !!specs);
    } catch (error) {
      console.warn('[DETAILS] Erro ao buscar specs externas:', error.message);
      // aqui NÃO damos throw, só logamos
    }
  }

  return {
    fipe: fipeData,
    specs
  };
}

module.exports = {
  getCarDetails
};
