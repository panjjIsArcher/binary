const isSignificant = (num, base) => {
  // num不是有效数字
  if (typeof num !== "number" || Number.isNaN(Number(num))) {
    return false;
  } else if (base < 1 || !Number.isInteger(base)) {
    return false;
  } else {
    return true;
  }
};

/**
 * N进制转换为10进制
 * @param {Number} num 数字
 * @param {Number} base n进制
 */
const transform = (num = 0, base = 10) => {
  if (!isSignificant(num, base)) {
    return false;
  }

  // 拆分为整数部分 和 浮点数部分
  const str = num.toString();
  const arr = [];
  const intPart = str.split(".")[0];
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    const item = str[i];
    const obj = {
      number: item,
      isDecimalPoint: item === ".",
      isIntPart: i + 1 <= intPart.length,
    };
    arr.push(obj);
  }

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const { isDecimalPoint, isIntPart, number } = item;
    if (isDecimalPoint) {
      continue;
    } else if (!isDecimalPoint && isIntPart) {
      // 整数部分
      sum += number * Math.pow(base, intPart.length - (i + 1));
    } else {
      // 浮点数部分
      sum += number * Math.pow(base, arr.length - intPart.length - 1 - i);
    }
  }

  return sum;
};
/**
 * 10进制转n进制
 * @param {Number} num
 * @param {Number} base
 */
const transformReverse = (num = 0, base = 2) => {
  if (!isSignificant(num, base)) {
    return false;
  }

  const arr = [];
  let start = num;
  while (start >= base) {
    const remainder = start % base; // 取余
    const quotient = parseInt(start / base);
    arr.push(remainder);
    start = quotient;
  }
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += Math.pow(10, arr.length - i - 1) * arr[i];
  }
  return sum;
};

export { transform, transformReverse };
