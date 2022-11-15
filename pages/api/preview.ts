import { Client, linkResolver } from 'lib/content/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from 'lib/api/Types'; // import from wherever this is set

export default async function handler<T>(req: NextApiRequest, res: NextApiResponse<ApiResponse<T>>): Promise<void> {
  const { token: ref, documentId } = req.query;
  let redirectUrl: string | undefined;
  if (typeof ref === 'string' && typeof documentId === 'string') {
    redirectUrl = await Client(req).getPreviewResolver(ref, documentId).resolve(linkResolver, '/');
  } else {
    return res.status(400).json({ success: false, errors: ['Invalid query'] });
  }

  if (!redirectUrl) {
    return res.status(401).json({ success: false, errors: ['Invalid token'] });
  }

  res.setPreviewData({ ref });

  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv='Refresh' content='0; url=${redirectUrl}' />
    <script>window.location.href = '${redirectUrl}'</script>
    </head>`
  );
  res.end();
}
