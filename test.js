var a = [1,2,3];
let b = a.reduce((accumulator ,currentValue)=> {
  console.log(accumulator);
  // console.log(currentValue);
  return accumulator + currentValue
});
// console.log(b);
