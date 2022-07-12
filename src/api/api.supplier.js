import base from './api.base'


function index(){
  let url = `supplier`
  return base().get(url);
}

const Supplier = {
  index,
}

export default Supplier
