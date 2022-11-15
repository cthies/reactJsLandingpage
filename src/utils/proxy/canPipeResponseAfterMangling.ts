import { Request } from 'express';
import { IncomingMessage } from 'http';

export default function canPipeResponseAfterMangling(req: Request, originRes: IncomingMessage): boolean {
  // We forward anything that is not understandable html
  const incomingHeaders = originRes.headers || {};
  const contentType = incomingHeaders['content-type'] || '';
  if (!/text\/html/.test(contentType)) {
    return true;
  }
  // We also do not wrap html that is used by legacy JS
  if (/isAjax=1/.test(req.url) || /\/egg\//.test(req.url) || /\/braintree\//.test(req.url)) {
    return true;
  }
  // If it was non GET, most probably we don't need to add header/footer on the answer.
  // ... most probably ...
  if (req.method !== 'GET') {
    return true;
  }
  return false;
}
