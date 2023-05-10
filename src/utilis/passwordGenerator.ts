const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = [33,35,36,37,42,43,61,63,64,94,124]
// const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
//   arrayFromLowToHigh(58, 64)
// ).concat(
//   arrayFromLowToHigh(91, 96)
// ).concat(
//   arrayFromLowToHigh(123, 126)
// )

function passwordGenerator(characterAmount:number= 10) {
    let charCodes = 
    LOWERCASE_CHAR_CODES
    .concat(UPPERCASE_CHAR_CODES)
    .concat(NUMBER_CHAR_CODES)
    .concat(SYMBOL_CHAR_CODES)
    
    
    const passwordCharacters = []
    for (let i = 0; i < characterAmount; i++) {
      const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
      console.log(characterCode)
      passwordCharacters.push(String.fromCharCode(characterCode))
    }
    return <string>passwordCharacters.join('')
  }
  
  function arrayFromLowToHigh(low:number, high:number) {
    const array = [] as number[]
    for (let i = low; i <= high; i++) {
      array.push(i)
    }
    return array
  }

  export default passwordGenerator

