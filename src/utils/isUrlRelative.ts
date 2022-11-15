const isUrlRelative = (url?: string): boolean => {
  const matches = url?.match('^(?!www.|(?:http|ftp)s?://|[A-Za-z]:\\|//).*');
  return Boolean(matches && matches.length > 0);
};

export default isUrlRelative;
