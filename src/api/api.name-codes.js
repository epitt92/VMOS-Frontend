import base from './api.base';

function gets() {
  return base().get(`name-codes`);
}

const NameCodes = {
  gets,
};

export default NameCodes;
