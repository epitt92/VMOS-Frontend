import base from './api.base';

function index(limit = 100, offset = 0, query) {
  return base().get(`alt-skus?limit=${limit}&offset=${offset}&query=${query}`);
}

function indexSelect(limit = 100, offset = 0, debtor, price) {
  return base().get(`alt-skus?limit=${limit}&offset=${offset}&debtor=${debtor}&price=${price}`);
}

const Altskus = {
  index,
  indexSelect,
};

export default Altskus;
