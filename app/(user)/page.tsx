'use client';
import { useState } from 'react';
import { generateImage } from '../../utils/stablediffusion';

export default function Home() {
  const [key, setKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [negativePrompt, setNegativePrompt] = useState('');
  const [advancedOptionsVisible, setAdvancedOptionsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleGenerateImage = async () => {
    try {
      const options = {
        width,
        height,
        negative_prompt: negativePrompt,
      };

      const imageData = await generateImage(prompt, options);
      setImageUrl(imageData.output[0]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Generate Image with Text</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerateImage();
        }}
      >
        <div className="mb-4">
          <label htmlFor="key" className="block mb-2">
            Key:
          </label>
          <input
            id="key"
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="prompt" className="block mb-2">
            Prompt:
          </label>
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="width" className="block mb-2">
            Width:
          </label>
          <input
            id="width"
            type="number"
            min="1"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value))}
            className="border border-gray-300 px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="height" className="block mb-2">
            Height:
          </label>
          <input
            id="height"
            type="number"
            min="1"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
            className="border border-gray-300 px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="negativePrompt" className="block mb-2">
            Negative Prompt:
          </label>
          <input
            id="negativePrompt"
            type="text"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <button
            type="button"
            onClick={() => setAdvancedOptionsVisible(!advancedOptionsVisible)}
            className="text-blue-500"
          >
            {advancedOptionsVisible ? 'Hide' : 'Show'} Advanced Options
          </button>
          {advancedOptionsVisible && (
            <>
              <div className="mb-4">
                <label htmlFor="samples" className="block mb-2">
                  Samples:
                </label>
                <input
                  id="samples"
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="border border-gray-300 px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="num_inference_steps" className="block mb-2">
                  Number of Inference Steps:
                </label>
                <input
                  id="num_inference_steps"
                  type="number"
                  min="1"
                  max="50"
                  defaultValue="20"
                  className="border border-gray-300 px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="guidance_scale" className="block mb-2">
                  Guidance Scale:
                </label>
                <input
                  id="guidance_scale"
                  type="number"
                  min="1"
                  max="20"
                  step="0.1"
                  defaultValue="7.5"
                  className="border border-gray-300 px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="enhance_prompt" className="block mb-2">
                  Enhance Prompt:
                </label>
                <select
                  id="enhance_prompt"
                  defaultValue="yes"
                  className="border border-gray-300 px-3 py-2 w-full"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="seed" className="block mb-2">
                  Seed:
                </label>
                <input
                  id="seed"
                  type="text"
                  placeholder="Leave blank for a random seed"
                  className="border border-gray-300 px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="webhook" className="block mb-2">
                  Webhook:
                </label>
                <input
                  id="webhook"
                  type="text"
                  placeholder="Webhook URL"
                  className="border border-gray-300 px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="track_id" className="block mb-2">
                  Track ID:
                </label>
                <input
                  id="track_id"
                  type="text"
                  placeholder="Tracking ID"
                  className="border border-gray-300 px-3 py-2 w-full"
                />
              </div>
            </>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate Image
        </button>
      </form>

      {imageUrl && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Generated Image:</h2>
          <img
            src={imageUrl}
            alt="Generated"
            className="border border-gray-300"
          />
        </div>
      )}
    </div>
  );
}
