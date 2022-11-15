import { IncomingMessage } from 'http';
import parseCookies from 'src/utils/parseCookies';

export default function getPreviewRefFromReq(req: IncomingMessage | undefined) {
  const repoName = 'foodspring';
  const rawPreviewCookie = parseCookies(req)['io.prismic.preview'];
  const previewCookie = rawPreviewCookie ? JSON.parse(unescape(rawPreviewCookie)) : null;
  const previewCookieObject = previewCookie ? previewCookie[`${repoName}.prismic.io`] : null;
  return previewCookieObject && previewCookieObject.preview ? previewCookieObject.preview : null;
}
