import base from './api.base'

function indexDebtors(page, per_page){
  return base().get(`locations/debtors?page=${page}&per_page=${per_page}`);
}

function indexLocation(acc_no, page, per_page){
  return base().get(`locations?acc_no=${acc_no}&page=${page}&per_page=${per_page}`);
}

function detail(code){
  return base().get(`product-locations/products/${code}`);
}

function updateProductLocation(data){
  return base().patch(`product-locations`, data);
}

function deleteProductLocation(data){
  return base().delete(`product-locations`, {data});
}

function createProductLocation(data){
  return base().post(`product-locations`, data);
}

function getSaLocation(code, limit, offset){
  return base().get(`product-locations/sa-locations/${code}?limit=${limit}&offset=${offset}`);
}

function updateSaLocation(code, data){
  return base().patch(`product-locations/sa-locations/${code}`, data);
}

const Locations = {
  updateProductLocation,
  deleteProductLocation,
  createProductLocation,
  indexDebtors,
  indexLocation,
  detail,
  getSaLocation,
  updateSaLocation
}

export default Locations
