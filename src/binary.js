/**
 * N进制转换为10进制
 * @param {Number} num 数字
 * @param {Number} base n进制
 */
const transform = (num = 0, base = 10) => {
  // num不是有效数字
  if (typeof num !== "number" || Number.isNaN(Number(num))) {
    return false;
  }

  // base不是正整数
  if (base < 1 || !Number.isInteger(base)) {
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
      debugger
    } else {
      // 浮点数部分
      sum += number * Math.pow(base, arr.length - intPart.length - 1 - i);
      debugger
    }
  }
  
  return sum;
};

export { transform };
