import base from './api.base';

const getNameCodes = async () => {
  return base().get('name-codes');
};

const getClassifications = async () => {
  return base().get('classifications');
};

const generateProductCode = async (id, character_id, name_code_id) => {
  return base().post(`supplier-collections/${id}/product-codes`, {
    character_id,
    name_code_id,
  });
};

const generateUpc = async () => {
  return base().get('upc');
};

const Collections = {
  getNameCodes,
  getClassifications,
  generateUpc,
  generateProductCode,
};

export default Collections;
