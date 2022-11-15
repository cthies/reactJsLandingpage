// https://stackoverflow.com/a/8189268/571126

function chunkifyArray<T>(array: T[], count: number, balanced: boolean): T[][] {
  if (count < 2) return [array];

  const length = array.length;
  const out = [];
  let i = 0;
  let size;

  if (length % count === 0) {
    size = Math.floor(length / count);
    while (i < length) {
      out.push(array.slice(i, (i += size)));
    }
  } else if (balanced) {
    while (i < length) {
      size = Math.ceil((length - i) / count--);
      out.push(array.slice(i, (i += size)));
    }
  } else {
    count--;
    size = Math.floor(length / count);
    if (length % size === 0) size--;
    while (i < size * count) {
      out.push(array.slice(i, (i += size)));
    }
    out.push(array.slice(size * count));
  }

  return out;
}

export default chunkifyArray;
