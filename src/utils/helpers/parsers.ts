const parseCUIT = (val, oldValue) => {
  const newVal = val;
  newVal.value = newVal.value
    .split('-')
    .map(e => e.replace(/\D/g, ''))
    .join('-');
  if (val.value.length <= 13) {
    if (val.value.length === 2 && oldValue.value.length < 2) {
      newVal.value = `${newVal.value.substr(0, 2)}-${newVal.value.substr(2, 3)}`;
    } else if (val.value.length === 11 && oldValue.value.length < 11) {
      newVal.value = `${newVal.value.substr(0, 11)}-${newVal.value.substr(11, 12)}`;
    }
  } else {
    newVal.value = newVal.value.substr(0, 13);
  }

  return newVal;
};

const padLeft = (text: string, padChar: string, size: number): string => {
  return (String(padChar).repeat(size) + text).substr(size * -1, size);
};
const addCeros = (val, length) => {
  const newVal = val;
  if (val.value) {
    newVal.value = padLeft(val.value.replace(/\D/g, ''), '0', length);
  }
  return newVal;
};
export default { parseCUIT, addCeros };
