import base from './api.base'
import axios from 'axios'
import qs from "qs";


function create(data){
  return base().post(`picking`, data);
}

function index(page, query){
  const queryParams = qs.stringify({ ...query, page});
  let url = `/api/picking?${queryParams}`

  return axios(url);
}

const Picking = {
  create,
  index,
}

export default Picking
