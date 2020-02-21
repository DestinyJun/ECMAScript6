var counter = 4;
function addCounter() {
   console.log('我是CommonJS');
}
module.exports = {
  counter: counter,
  addCounter: addCounter
};

// exports.name = 'value';
