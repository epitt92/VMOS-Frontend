import base from './api.base';
// import { checkValidExist } from 'helpers';

function gets(page, per_page, status = [], invoice_ref = '', sortOrder = '', bylocation = '') {
  let url = '';
  if (status.length === 0 || status.length === 1) {
    url = `orders?is_or_search=0&page=${page - 1}&per_page=${per_page}`;
  } else {
    url = `orders?is_or_search=1&page=${page - 1}&per_page=${per_page}`;
  }

  let search = [];
  if (status.findIndex(e => e === 'created') > -1) {
    search.push({ key: 'statusId', value: 1 });
  }

  if (status.findIndex(e => e === 'submitted') > -1) {
    search.push({ key: 'statusId', value: 2 });
  }
  if (status.findIndex(e => e === 'preprocessing') > -1) {
    search.push({ key: 'statusId', value: 3 });
  }
  if (status.findIndex(e => e === 'processing') > -1) {
    search.push({ key: 'statusId', value: 4 });
  }
  if (status.findIndex(e => e === 'draft') > -1) {
    search.push({ key: 'statusId', value: 5 });
  }
  if (status.findIndex(e => e === 'readyForDelivery') > -1) {
    search.push({ key: 'statusId', value: 6 });
  }
  if (status.findIndex(e => e === 'packing') > -1) {
    search.push({ key: 'statusId', value: 7 });
  }
  if (status.findIndex(e => e === 'packed') > -1) {
    search.push({ key: 'statusId', value: 8 });
  }
  if (status.findIndex(e => e === 'delivering') > -1) {
    search.push({ key: 'statusId', value: 9 });
  }
  if (status.findIndex(e => e === 'complete') > -1) {
    search.push({ key: 'statusId', value: 10 });
  }
  if (status.findIndex(e => e === 'cancelled') > -1) {
    search.push({ key: 'statusId', value: 11 });
  }
  if (status.findIndex(e => e === 'void') > -1) {
    search.push({ key: 'statusId', value: 12 });
  }
  if (status.findIndex(e => e === 'prepacking') > -1) {
    search.push({ key: 'statusId', value: 13 });
  }
  if (status.findIndex(e => e === 'prepacked') > -1) {
    search.push({ key: 'statusId', value: 14 });
  }

  if (bylocation) {
    search.push({ key: 'acLocationId', value: bylocation });
  }

  if (invoice_ref) {
    search.push({ key: 'invoice_ref', value: invoice_ref });
  }

  if (search.length > 0) {
    url += '&search=' + search.map(v => `${v.key}:${v.value}`).join(',');
  }

  if (sortOrder) {
    url += '&sort=createdAt:' + sortOrder;
  }

  return base().get(`${url}`);
}

function getById(id) {
  return base().get(`orders?&search=id:${id}&page=0&per_page=1`);
}

function getItems(id) {
  return base().get(`orders/${id}/items`);
}

function updateItems(id, data) {
  return base().put(`orders/${id}/items`, data);
}

function create(data) {
  return base().post(`orders`, data);
}

function updateStatus(id, string) {
  const data = {
    status: string,
  };
  return base().patch(`orders/${id}`, data);
}

function getAltSkus(id) {
  return base().get(`orders/${id}/alt_skus`);
}

function patch(id, data) {
  return base().patch(`orders/${id}`, data);
}

function deleteItem(id, itemId) {
  return base().delete(`orders/${id}/items/${itemId}`);
}

const Orders = {
  gets,
  getItems,
  create,
  updateItems,
  updateStatus,
  getAltSkus,
  getById,
  patch,
  deleteItem,
};

export default Orders;
