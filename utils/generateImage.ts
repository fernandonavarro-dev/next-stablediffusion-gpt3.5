import axios from 'axios';

const API_URL = 'https://stablediffusionapi.com/api/v3/text2img';
const API_KEY = process.env.NEXT_PUBLIC_STABLEDIFFUSION_API_KEY;

// Define Options interface for specifying image generation options
export interface Options {
  width?: number;
  height?: number;
  samples?: number;
  negative_prompt?: string;
  num_inference_steps?: number;
  guidance_scale?: number;
  enhance_prompt?: string;
  seed?: string | null;
  webhook?: string | null;
  track_id?: string | null;
}

// Generate image function using the API
export const generateImage = async (
  text: string,
  options: Options = {}
): Promise<any> => {
  try {
    // Make a POST request to the API with the specified options
    const response = await axios.post(
      API_URL,
      {
        key: API_KEY,
        prompt: text,
        width: options.width || 512,
        height: options.height || 512,
        samples: options.samples || 1,
        negative_prompt: options.negative_prompt || '',
        num_inference_steps: options.num_inference_steps || 20,
        guidance_scale: options.guidance_scale || 7.5,
        enhance_prompt: options.enhance_prompt || 'yes',
        seed: options.seed || null,
        webhook: options.webhook || null,
        track_id: options.track_id || null,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};
