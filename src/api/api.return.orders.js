import base from './api.base'
import { checkValidExist } from 'helpers';

function create(data){
  return base().post(`return-orders`, data);
}

function index(page, limit, keyword, sort, sortOrder, status){
  let url = `return-orders?offset=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}`
  const newStatus = status[0].toUpperCase() + status.slice(1)
  if(status !== 'all' && checkValidExist(keyword)){
    url = `return-orders?offset=${page}&limit=${limit}&query=${keyword}&sort=${sort}&sortOrder=${sortOrder}&status=${newStatus}`
  }else if(checkValidExist(keyword)){
    url = `return-orders?offset=${page}&limit=${limit}&query=${keyword}&sort=${sort}&sortOrder=${sortOrder}`
  }else if(status !== 'all'){
    url = `return-orders?offset=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}&status=${newStatus}`
  }

  return base().get(`${url}`);
}

function detail(id){
  return base().get(`return-orders/${id}`);
}

function createItems(data){
  return base().post(`return-orders/items`, data);
}

const ReturnOrders = {
  create,
  index,
  detail,
  createItems
}

export default ReturnOrders
