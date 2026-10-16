const ONES = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
];

const TENS = [
  '',
  '',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
];

/**
 * A count in words ("thirty", "twenty-one") below a hundred, digits above,
 * so copy that counts the products follows the data.
 */
export function numberWord(n: number, capital = false): string {
  const word =
    n < 20
      ? ONES[n]
      : n < 100
        ? TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : '')
        : String(n);
  return capital ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}
