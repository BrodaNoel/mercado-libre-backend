module.exports = {
  getDecimals: (number) => parseInt(number.toString().split('.')[1] || 0)
};
