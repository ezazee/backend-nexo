import { Request, Response } from 'express';
import { put } from '@vercel/blob';
import { Buffer } from 'buffer';

export const uploadBlob = async (req: Request, res: Response) => {
  try {
    const { filename, contentType, base64 } = req.body;

    if (!filename || !base64) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const buffer = Buffer.from(base64, 'base64');

    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: contentType || 'image/png',
    });

    return res.status(200).json({ url: blob.url });
  } catch (error: any) {
    console.error('[Blob Upload Error]', error);
    return res.status(500).json({ error: error.message || 'Upload failed' });
  }
};
