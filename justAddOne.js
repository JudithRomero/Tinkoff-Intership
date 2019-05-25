function justAddOne(array, number) {
  let num = arrayToNumber(array)
  if (num === null) return null
  return numberToArray(num + number)
}

const arrayToNumber = (array) => {
  let result = 0
  let mul = 1
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  for (let i = array.length - 1; i >= 0; i--) {
    if (!digits.includes(array[i])) return null
    result += array[i] * mul
    mul *= 10
  }
  return result
}

const numberToArray = (number) => {
  if (number === 0) return [0]
  const result = []
  while (number > 0) {
    let mod = number % 10
    result.push(mod)
    number = (number - mod) / 10
  }
  return result.reverse()
}

console.log(justAddOne([1, 0, 9], 2)); // 109 + 2 = 111; => [1, 1, 1]
console.log(justAddOne([2, 5, 1], 5)); // 251 + 5 = 256; => [2, 5, 6]
console.log(justAddOne([1], 4020)); // 1 + 4020 = 4021; => [4, 0, 2, 1]
console.log(justAddOne([1, '4', 11, null], 1)); // '4' - строка и есть null => null
console.log(justAddOne([0, 0, 0], 0)); // 000 + 0 = 0; => [0]
