import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Methos not allowed' })
  }

  try {
  } catch (error) {
    console.log('[MESSAGES_POST]', error)
    return res.status(500).json({
      message: 'Internal Error'
    })
  }
}
