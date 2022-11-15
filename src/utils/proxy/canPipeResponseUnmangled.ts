import { Request } from 'express';
import { IncomingMessage } from 'http';

export default function canPipeResponseUnmangled(req: Request, originRes: IncomingMessage): boolean {
  // Redirects may pass through:
  if ((originRes.statusCode || 0) >= 300 && (originRes.statusCode || 0) < 400) {
    return true;
  }
  // As well as failures:
  if ((originRes.statusCode || 0) >= 500 && (originRes.statusCode || 0) < 999) {
    return true;
  }
  // Magic URL that needs no mangling
  if (req.url.indexOf('setcookie.php') > -1) {
    return true;
  }
  // We only mangle non-media requests
  if (/^(\/\w\w)?\/media/.test(req.url)) {
    return true;
  }
  // We only mangle text or json responses
  const incomingHeaders = originRes.headers || {};
  const contentType = incomingHeaders['content-type'] || '';
  if (!/text/.test(contentType) && !/application\/json/.test(contentType)) {
    return true;
  }
  return false;
}
