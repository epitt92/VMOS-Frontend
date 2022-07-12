import base from './api.base';
import qs from 'qs';

function create(data) {
  return base().post(`supplier-collections`, data);
}

function update(data) {
  return base().put(`supplier-collections`, data);
}

async function get(id) {
  const queryParams = qs.stringify({ is_or_search: 1, search: `id:${id}` });
  let url = `supplier-collections?${queryParams}`;
  const resp = await base().get(url);

  return resp.data.data.items[0];
}

function index(page, query) {
  const q = Object.assign({}, query);
  if (q.search) {
    q.search = `name:${q.search},`;
  }

  if (q.status) {
    if (q.status === 'all') {
      q.search = '';
    } else {
      q.search += `status:${q.status}`;
    }
  }

  delete q.status;

  const queryParams = qs.stringify({ ...q, page });
  let url = `supplier-collections?${queryParams}`;

  return base().get(url);
}

function getProducts(id) {
  return base().get(`supplier-collections/${id}/products`);
}

function createProducts(id, data) {
  console.log('datas', data);
  return base().post(`supplier-collections/${id}/products`, data);
}

function updateProducts(id, data, params) {
  let url = `supplier-collections/${id}/products`;
  const query = qs.stringify(params);
  if (query) {
    url += `?${query}`;
  }
  return base().patch(url, data);
}

function getCost(id) {
  return base().get(`supplier-collections/${id}/other-cost`);
}

function createCost(id, data) {
  return base().post(`supplier-collections/${id}/other-cost`, data);
}

function updateCost(id, costId, data) {
  return base().patch(`supplier-collections/${id}/other-cost?supplierOtherCostId=${costId}`, data);
}

const SupplierCollection = {
  get,
  create,
  update,
  createProducts,
  updateProducts,
  getProducts,
  index,
  createCost,
  updateCost,
  getCost,
};

export default SupplierCollection;
