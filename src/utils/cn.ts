function cn(...args: unknown[]): string {
  return args
    .map((arg) => arg ?? '')
    .filter((arg) => !!arg)
    .join(' ');
}

export default cn;
