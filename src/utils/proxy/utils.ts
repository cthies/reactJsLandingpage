import { OutgoingHttpHeaders } from 'http';
import zlib from 'zlib';

export function appendHeader(headers: OutgoingHttpHeaders, key: string, value: string | string[]): void {
  const current = headers[key];
  if (current === undefined || typeof current === 'number') {
    headers[key] = value;
    return;
  }
  if (typeof value === 'string') {
    value = [value];
  }
  if (typeof current === 'string') {
    headers[key] = [current, ...value];
  } else {
    headers[key] = [...current, ...value];
  }
}

export function streamToText(stream: NodeJS.ReadableStream, compression: string | undefined): Promise<string> {
  return new Promise((resolve, reject) => {
    const _buf: Uint8Array[] = [];
    stream.on('data', (chunk: Uint8Array) => {
      _buf.push(chunk);
    });
    stream.on('error', (err: Error) => {
      reject(err);
    });
    stream.on('end', () => {
      // TODO: Handle decompression with more grace.
      const buf = Buffer.concat(_buf);
      switch (compression) {
        case 'x-deflate':
        case 'deflate':
          return zlib.inflate(buf, (error, buf) => {
            resolve(buf.toString());
          });
        case 'x-gzip':
        case 'gzip':
          return zlib.unzip(buf, (error, buf) => {
            resolve(buf.toString());
          });
        case undefined:
          return resolve(buf.toString());
        default:
          return reject('compression unsupported');
      }
    });
  });
}
