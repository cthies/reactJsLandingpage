import { IncomingMessage, OutgoingHttpHeaders } from 'http';
import https from 'https';

export default function roundtrip(
  method: string,
  url: string,
  data: NodeJS.ReadableStream | null,
  headers: OutgoingHttpHeaders
): Promise<IncomingMessage> {
  return new Promise<IncomingMessage>((resolve, reject) => {
    // TODO: perform a switch on url.proto
    const req = https.request(
      url,
      {
        method: method,
        headers: headers,
        setHost: false,
      },
      (res) => {
        resolve(res);
      }
    );
    req.on('error', (e: Error) => {
      reject(e);
    });
    if (data) {
      data.pipe(req);
    } else {
      req.end();
    }
  });
}
