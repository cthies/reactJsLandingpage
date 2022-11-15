import type { NextApiRequest, NextApiResponse } from 'next';

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  if (process.env.TERMINATE) {
    return res.status(500).send('TERMINATING');
  }
  res.status(200).send('OK');
};
