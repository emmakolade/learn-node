const arrNum = new Array(2, 1, 4, 3, 6, 5, 8, 7, 10, 9);

const transformArrayOfNumbers = (arrNum) => {
  const oddNum = arrNum.filter((num) => num % 2 === 1);
  const doubleNum = oddNum.map((num) => num * 2);
  const reverseNum = doubleNum.reverse();
  return reverseNum;
};
