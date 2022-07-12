import base from './api.base';

function gets() {
  return base().get(`classifications`);
}

const Classifications = {
  gets,
};

export default Classifications;
