import { checkValidExist } from 'helpers';
import base from './api.base';

function index(limit, offset, query, orderId) {
  if(checkValidExist(orderId)){
    return base().get(`items?limit=${limit}&offset=${offset}&query=${query}&orderId=${orderId}`);
  }
  return base().get(`items?limit=${limit}&offset=${offset}&query=${query}`);
}

const Items = {
  index,
};

export default Items;
