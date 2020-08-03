export function stringToHash(val: string) {
  var hash = 0;

  if (val.length === 0) return hash;

  for (let i = 0; i < val.length; i++) {
    let char = val.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash;
}

function intToHex(i: number) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

const colors: string[] = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

export function stringToColor(val: string, hex?: boolean): string {
  const hashedString = stringToHash(val);
  if (hex) return intToHex(hashedString);

  let index = hashedString % colors.length;
  return colors[index];
}
