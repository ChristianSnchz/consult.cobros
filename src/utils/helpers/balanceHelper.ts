// Transform 3221.51 in 3221,51
// Transform 3222.51 in 3.221,51
const formatBalance = (x: number): string => {
  if (!x) {
    return '-,-';
  }
  const formattedBalance = x.toString().replace('.', ',');
  if (formattedBalance.indexOf(',') === -1) {
    return formattedBalance.concat(',00').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  if (formattedBalance.indexOf(',') > -1 && formattedBalance.split(',')[1].length === 1) {
    return formattedBalance.concat('0').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  if (formattedBalance.indexOf(',') > -1 && formattedBalance.split(',')[1].length > 2) {
    const splited = formattedBalance.split(',');
    return `${splited[0]},${splited[1].slice(0, 2)}`;
  }
  return formattedBalance.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export default formatBalance;
