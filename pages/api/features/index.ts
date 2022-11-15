import { getFeatures } from 'src/utils/features';
import { Request, Response } from 'express';

export default async function handler(req: Request, res: Response): Promise<void> {
  res.end(JSON.stringify(getFeatures(req.hostname), null, 2));
}
