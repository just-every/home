const ones = [
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
const tens = [
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

/** A count in words to start a sentence ("Fourteen"); numerals from 100. */
export function spelledCount(count: number): string {
  if (!Number.isInteger(count) || count < 0 || count > 99) {
    return String(count);
  }
  const word =
    count < 20
      ? ones[count]
      : tens[Math.floor(count / 10)] +
        (count % 10 ? `-${ones[count % 10]}` : '');
  return word.charAt(0).toUpperCase() + word.slice(1);
}
