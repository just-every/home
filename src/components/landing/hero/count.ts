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

/** A whole number under a hundred in words: "seven", "thirty", "forty-two". */
function words(n: number): string {
  if (n < 20) return ONES[n];
  const tens = TENS[Math.floor(n / 10)];
  const ones = n % 10;
  return ones ? `${tens}-${ONES[ones]}` : tens;
}

/** A count as words ("fourteen", "thirty", "forty-two") below a hundred, then as digits. */
export function countWord(n: number, capital = false): string {
  const word = Number.isInteger(n) && n >= 0 && n < 100 ? words(n) : String(n);
  return capital ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}
