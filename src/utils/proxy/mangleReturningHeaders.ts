import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { appendHeader } from 'src/utils/proxy/utils';
import { MAGENTO_HOST } from 'src/utils/proxy/constants';
import mangleReturningCookie from 'src/utils/proxy/mangleReturningCookie';

//Pass none, unless included
export default function mangleReturningHeaders(
  headers: IncomingHttpHeaders,
  originProto: string,
  originDomain: string,
  ourProto: string,
  ourDomain: string
): OutgoingHttpHeaders {
  const result = {} as OutgoingHttpHeaders;

  // Expecting Magento to be fooled by nginx and say that there is no origin
  originDomain = originDomain.replace(/^origin-/, '');

  let header: keyof typeof headers;
  for (header in headers) {
    switch (header) {
      case 'content-type':
      case 'cache-control':
      case 'last-modified':
      case 'expires':
      case 'x-localCache': {
        const value = headers[header] || '';
        appendHeader(result, header, value);
        break;
      }
      case 'location': {
        let location = headers['location'] || '';
        if (location.includes(MAGENTO_HOST) || location.includes(originDomain)) {
          location = location.replaceAll(MAGENTO_HOST, ourDomain);
          location = location.replaceAll(originDomain, ourDomain);
          if (ourProto !== originProto) {
            location = location.replaceAll(`${originProto}://`, `${ourProto}://`);
          }
        }
        appendHeader(result, 'location', location);
        break;
      }
      case 'set-cookie': {
        // Show user that all origin scoped cookies are ours instead
        let cookies = headers['set-cookie'] || [];
        cookies = cookies.map((cookie) => mangleReturningCookie(cookie, originDomain, ourDomain, ourProto === 'http'));
        appendHeader(result, 'set-cookie', cookies);
        break;
      }
      default:
        break;
    }
  }

  return result;
}
