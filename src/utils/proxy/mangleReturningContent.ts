import { IncomingHttpHeaders } from 'http';

export default function mangleReturningContent(
  headers: IncomingHttpHeaders,
  content: string,
  originProto: string,
  originDomain: string,
  ourProto: string,
  ourDomain: string
): string {
  // After the addition of cloudfront in front of shop-next, we had to migrate all legacy cloudfronts
  // from accepting [dev|stage|www].foodspring.tld to origin-[dev|stage|www].foodspring.tld
  // That change left this code in shambles. To revert this, instead of relying on more complicated configuration
  // we can make a swap right here:
  originDomain = originDomain.replace(/^origin-/, '');

  // Be wild. Content can have regex representation of origin domain (semi escaped)
  const regexOfOriginDomain = originDomain.replaceAll('.', '\\.');
  const regexOfOurDomain = ourDomain.replaceAll('.', '\\.');

  content = content.replaceAll(`${originProto}:\\/\\/${regexOfOriginDomain}`, `${ourProto}:\\/\\/${regexOfOurDomain}`);
  content = content.replaceAll(regexOfOriginDomain, regexOfOurDomain);

  // Also there are instances where only \ are escaped.
  content = content.replaceAll(`${originProto}:\\/\\/${originDomain}`, `${ourProto}:\\/\\/${ourDomain}`);

  // Other instances:
  for (const proto of ['http', 'https']) {
    content = content.replaceAll(`${proto}://${originDomain}`, `${ourProto}://${ourDomain}`);
  }
  content = content.replaceAll(`${originDomain}`, `${ourDomain}`);

  // Font replacing with our stuff
  if (headers['content-type']?.match(/text\/css/)) {
    content = content.replaceAll('../fonts/gm-iconfont', '/fonts/gm-iconfont');
  }

  return content;
}
