function getLanguageFromUrl(url = ''): string {
  const langCodeMatch = url.match(/^\/(\w\w)(\?|\/|$)/i);
  if (langCodeMatch) {
    return langCodeMatch[1];
  }
  return '';
}

export default getLanguageFromUrl;
