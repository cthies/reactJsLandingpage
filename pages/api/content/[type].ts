import { ApiResponse } from 'lib/api/Types';
import { NextApiRequest, NextApiResponse } from 'next';
import { getPrismicSingle } from 'lib/api/content/prismic';
import getPreviewRefFromReq from 'src/utils/getPreviewRefFromReq';

export default async function handler<T>(req: NextApiRequest, res: NextApiResponse<ApiResponse<T>>): Promise<void> {
  const errors: string[] = [];
  ['type', 'region', 'language'].forEach((key) => {
    if (!req.query[key]) {
      errors.push(`param '${key}' is required`);
    }
  });

  if (errors.length > 0) {
    res.status(400).json({ success: false, errors: errors });
    return;
  }

  const { type, region, language } = req.query as {
    type: string;
    region: string;
    language: string;
  };

  try {
    switch (type) {
      case 'config':
        res
          .status(200)
          .json({ success: true, data: await getPrismicSingle(type, language, region, getPreviewRefFromReq(req)) });
        break;
      default:
        res.status(404).json({ success: false, errors: [`content ${type} not supported`] });
    }
  } catch (error) {
    res.status(404).json({ success: false, errors: [String(error)] });
  }
}
