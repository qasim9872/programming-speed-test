export interface CodeLevel {
  title: string;
  codeToType: string;
}

// function isPrimeNumber(numberToCheck) {
//     let isPrime = true;

//     if (numberToCheck > 1) {

//     }

//     return isPrime;
// }

const levels: CodeLevel[] = [
  { title: 'Hello World', codeToType: "console.log('Hello World');" },
  {
    title: 'Add Two Numbers',
    codeToType: `function add(num1, num2) {
    return num1 + num2;
}`,
  },
  //   {
  //     title: 'Is Prime Number',
  //     codeToType: `function add(num1, num2) {
  //     return num1 + num2;
  // }`,
  //   },
];

const SpeedyCoder = {
  TOTAL_TIME: 60 * 1000, // 60 seconds
  INTERVAL: 1000,
  CODE_LEVELS: levels,
};

export default SpeedyCoder;
