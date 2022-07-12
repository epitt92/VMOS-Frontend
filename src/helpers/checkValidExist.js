const checkValidExist = value => {
  let isValid;
  if (/^\s*$/.test(value)) {
    isValid = false;
  } else if (/^\d+$/.test(value)) {
    isValid = value > 0;
  } else if (/^\s+$/.test(value)) {
    isValid = value.length > 0;
  } else {
    isValid = !!value;
  }

  return isValid;
};

export default checkValidExist;
