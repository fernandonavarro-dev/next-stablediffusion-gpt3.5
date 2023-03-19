// 'use client';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { ImageAnnotatorClient } from '@google-cloud/vision';

// const client = new ImageAnnotatorClient({
//   credentials: {
//     client_email: process.env.GOOGLE_CLIENT_EMAIL,
//     private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   },
// });

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== 'POST') {
//     res.status(405).json({ message: 'Method not allowed' });
//     return;
//   }

//   const { image } = req.body;

//   try {
//     const [response] = await client.labelDetection(image);
//     const labels = response.labelAnnotations;
//     const description =
//       labels?.map((label) => label.description).join(', ') || '';

//     res.status(200).json({ description });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
