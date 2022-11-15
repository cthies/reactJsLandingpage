import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from 'lib/api/Types';
import { parse } from 'url';

export default async function handler<T>(req: NextApiRequest, res: NextApiResponse<ApiResponse<T>>): Promise<void> {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData();

  const queryObject = parse(req.url || '', true).query;
  const redirectUrl = queryObject && queryObject.currentUrl ? queryObject.currentUrl : '/';

  res.writeHead(307, { Location: redirectUrl });
  res.end();
}
