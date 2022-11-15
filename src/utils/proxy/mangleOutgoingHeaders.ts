import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { appendHeader } from 'src/utils/proxy/utils';
import mangleOutgoingCookie from 'src/utils/proxy/mangleOutgoingCookie';

// Pass all, unless excluded.
export default function mangleOutgoingHeaders(
  headers: IncomingHttpHeaders,
  originProto: string,
  originDomain: string,
  ourProto: string,
  ourDomain: string
): OutgoingHttpHeaders {
  const result = {} as OutgoingHttpHeaders;

  // Expecting Magento to be fooled by nginx and say that there is no origin in the request
  const magentoShownDomain = originDomain.replace(/^origin-/, '');

  //DEV-6276: Extra header for everything that goes via here:
  appendHeader(result, 'x-shop-next', '1');

  let header: keyof typeof headers;
  for (header in headers) {
    switch (header) {
      case 'via':
        // We are accumulating > 2 CF vias, thus we are considered a loop.
        // https://stackoverflow.com/questions/59130801/cloudfront-custom-origin-403-response
        break;
      case 'host':
        appendHeader(result, header, originDomain);
        break;
      case 'accept-encoding': {
        // TODO: Handle deflating with more grace.
        const sharedUnderstanding: string[] = [];
        const clientUnderstanding = (headers[header] || '').toString().split(',');
        if ('gzip' in clientUnderstanding) {
          sharedUnderstanding.push('gzip');
        }
        if ('deflate' in clientUnderstanding) {
          sharedUnderstanding.push('deflate');
        }
        if (sharedUnderstanding.length > 0) {
          appendHeader(result, header, sharedUnderstanding.join(','));
        }
        break;
      }
      case 'content-length':
        break;
      case 'cookie': {
        const value = headers[header] || '';
        appendHeader(result, header, mangleOutgoingCookie(value, ourDomain, magentoShownDomain));
        break;
      }
      case 'origin':
      case 'referer': {
        const value = headers[header] || '';
        appendHeader(result, header, value.replaceAll(ourDomain, magentoShownDomain));
        break;
      }
      case 'x-forwarded-for': {
        const value = headers[header] || '';
        appendHeader(result, header, value);
        appendHeader(result, 'x-pierre-will-know-what-to-do', value);
        break;
      }
      default: {
        const value = headers[header] || '';
        appendHeader(result, header, value);
        break;
      }
    }
  }

  return result;
}
