import { IncomingMessage } from 'http';

export default function parseCookies(request: IncomingMessage | undefined): any {
  const list = {} as any;
  const rc = request?.headers.cookie;

  if (rc) {
    try {
      rc.split(';').forEach(function (cookie: string) {
        const parts = cookie.split('=');
        const part = parts.shift();
        if (part) {
          list[part.trim()] = decodeURI(parts.join('='));
        }
      });
    } catch (e) {
      return list;
    }
  }

  return list;
}
