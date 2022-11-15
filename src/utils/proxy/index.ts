import canPipeResponseAfterMangling from 'src/utils/proxy/canPipeResponseAfterMangling';
import roundtrip from 'src/utils/proxy/roundtrip';
import mangleOutgoingHeaders from 'src/utils/proxy/mangleOutgoingHeaders';
import mangleReturningHeaders from 'src/utils/proxy/mangleReturningHeaders';
import mangleReturningContent from 'src/utils/proxy/mangleReturningContent';
import canPipeResponseUnmangled from 'src/utils/proxy/canPipeResponseUnmangled';
import { ResponseBolted } from 'lib/bolts';
import { streamToText } from 'src/utils/proxy/utils';
import { Request, Response } from 'express';
import tracer from 'src/tracer';
import { MAGENTO_HOST } from 'src/utils/proxy/constants';
import mangleRemoteUrl from 'src/utils/proxy/mangleRemoteUrl';

async function proxy(req: Request, res: Response): Promise<string | undefined> {
  // Few notes:
  // 1. We will always go through Magento (even if we are going to magazine)
  // 2. Try to keep it cleaner.

  // TODO: when handling http and https look here too.
  const originProtocol = 'https';
  const originDomain = (res as ResponseBolted).props?.mainConfig?.appDomain;
  const ourDomain = req.headers['host'] || '';
  const ourProtocol = req.protocol || 'https';
  const remoteUrl = mangleRemoteUrl(`https://${MAGENTO_HOST}${req.url}`, req);

  const method = req.method;

  if (!originDomain || !ourDomain) {
    res.status(404).end();
    return;
  }

  try {
    // Forward request body on these methods
    const pipe = ['POST', 'PUT', 'PATCH'].includes(method) ? (req as NodeJS.ReadableStream) : null;

    const remoteRes = await roundtrip(
      method,
      remoteUrl,
      pipe,
      mangleOutgoingHeaders(req.headers, originProtocol, originDomain, ourProtocol, ourDomain)
    );

    const returningHeaders = mangleReturningHeaders(
      remoteRes.headers,
      originProtocol,
      originDomain,
      ourProtocol,
      ourDomain
    );

    if (canPipeResponseUnmangled(req, remoteRes)) {
      // Write headers and response code
      res.writeHead(remoteRes.statusCode || 500, returningHeaders);
      remoteRes.pipe(res);
      return;
    }

    // Download the response body
    let content = await streamToText(remoteRes, remoteRes.headers['content-encoding']);

    content = mangleReturningContent(remoteRes.headers, content, originProtocol, originDomain, ourProtocol, ourDomain);

    if (canPipeResponseAfterMangling(req, remoteRes)) {
      // Write headers and response code
      res.writeHead(remoteRes.statusCode || 500, returningHeaders);
      res.end(content);
      return;
    }

    // Set headers for later
    for (const header in returningHeaders) {
      res.setHeader(header, returningHeaders[header] || '');
    }

    return content;
  } catch (e) {
    res.header('x-proxy-error', (e as Error).message);
    res.status(503).end();
    return;
  }
}

export default tracer.wrap('proxy', proxy);
