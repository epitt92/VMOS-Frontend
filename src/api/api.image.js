import base from './api.base'

function upload(data, ) {
  let url = `assets`
  return base().post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const Image = {
  upload,
}

export default Image
