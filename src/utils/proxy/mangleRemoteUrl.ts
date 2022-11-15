import { Request } from 'express';

export default function mangleRemoteUrl(remoteUrl: string, req: Request): string {
  if (req.method === 'GET') {
    return remoteUrl;
  }
  // No idea what this is and how it was deduced.
  // I did some testing without this. I could not find a case where this is actually needed.
  // I leave this as is for now, but I expect it to be evaluated at some point in the future.
  // TODO: Read above and act on it.
  const url = new URL(remoteUrl);
  const separator = url.search ? '&' : '?';
  const append = req.headers['x-requested-with'] ? `${separator}ajax=true` : '';

  return remoteUrl + append;
}
