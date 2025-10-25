// Example: this binding variations

const obj = {
  x: 10,
  getX() { return this.x; }
};

function plainGetX() {
  return obj.getX;
}

function boundGetX() {
  return obj.getX.bind(obj);
}

if (require.main === module) {
  console.log('obj.getX():', obj.getX());
  console.log('plain call:', plainGetX()());
  console.log('bound call:', boundGetX()());
}

module.exports = { obj, plainGetX, boundGetX };