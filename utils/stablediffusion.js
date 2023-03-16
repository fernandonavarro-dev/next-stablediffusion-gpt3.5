import axios from 'axios';

const API_URL = 'https://stablediffusionapi.com/api/v3/text2img';
const API_KEY = process.env.STABLEDIFFUSION_API_KEY;

export const generateImage = async (text, options = {}) => {
  try {
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
