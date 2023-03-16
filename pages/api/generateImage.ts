import type { NextApiRequest, NextApiResponse } from 'next';
import { generateImage, Options } from '../../utils/generateImage';

// Define the default handler for the API route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'POST') {
    try {
      // Extract the text prompt and options from the request body
      const text = req.body.prompt;
      const options: Options = req.body.options;

      if (!text) {
        // Respond with an error if the prompt is missing
        res.status(400).json({ error: 'Prompt text is required' });
        return;
      }

      // Call the generateImage utility function with the text and options
      const imageData = await generateImage(text, options);
      // Respond with a success status and the generated image data
      res.status(200).json(imageData);
    } catch (error) {
      console.error('Error generating image:', error);
      res
        .status(500)
        .json({ error: 'An error occurred while generating the image' });
    }
  } else {
    // If the request is not a POST request, set the 'Allow' header and respond with an error
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
