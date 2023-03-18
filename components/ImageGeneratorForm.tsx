import { MutableRefObject, useRef, useState } from 'react';
import axios from 'axios';

interface ImageGeneratorFormProps {
  onGenerate: (imageUrl: string, promptText: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const ImageGeneratorForm: React.FC<ImageGeneratorFormProps> = ({
  onGenerate,
  isLoading,
  setIsLoading,
}) => {
  // State variables
  const [key, setKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [negativePrompt, setNegativePrompt] = useState('');
  const [advancedOptionsVisible, setAdvancedOptionsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Input references for advanced options
  const samplesInput = useRef<HTMLInputElement | null>(null);
  const numInferenceStepsInput = useRef<HTMLInputElement | null>(null);
  const guidanceScaleInput = useRef<HTMLInputElement | null>(null);
  const enhancePromptInput = useRef<HTMLSelectElement | null>(null);
  const seedInput = useRef<HTMLInputElement | null>(null);
  const webhookInput = useRef<HTMLInputElement | null>(null);
  const trackIdInput = useRef<HTMLInputElement | null>(null);

  // Function to handle image generation
  const handleGenerateImage = async () => {
    try {
      setIsLoading(true);
      // Prepare options for API call
      const options = {
        key,
        width,
        height,
        negative_prompt: negativePrompt,
        samples: samplesInput.current
          ? parseInt(samplesInput.current.value)
          : 1,
        num_inference_steps: numInferenceStepsInput.current
          ? parseInt(numInferenceStepsInput.current.value)
          : 20,
        guidance_scale: guidanceScaleInput.current
          ? parseFloat(guidanceScaleInput.current.value)
          : 7.5,
        enhance_prompt: enhancePromptInput.current
          ? enhancePromptInput.current.value
          : 'yes',
        seed: seedInput.current ? seedInput.current.value : null,
        webhook: webhookInput.current ? webhookInput.current.value : null,
        track_id: trackIdInput.current ? trackIdInput.current.value : null,
      };

      // Make API call and set the generated image URL
      const response = await axios.post('/api/generateImage', {
        prompt: prompt,
        options: options,
      });
      const generatedImageUrl = response.data.output[0];
      setImageUrl(generatedImageUrl);
      onGenerate(generatedImageUrl, prompt);
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setPrompt('');
    setNegativePrompt('');
  };

  // Render the form
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerateImage();
        }}
        className="grid grid-cols-1 gap-4"
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
            className="bg-gray-800 border border-gray-600 px-3 py-2 w-full rounded"
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
            className="bg-gray-800 border border-gray-600 px-3 py-2 w-full rounded"
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
            className="bg-gray-800 border border-gray-600 px-3 py-2 w-full rounded"
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
            className="bg-gray-800 border border-gray-600 px-3 py-2 w-full rounded"
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
            className="bg-gray-800 border border-gray-600 px-3 py-2 w-full rounded"
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
                  ref={samplesInput}
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="bg-gray-800 border border-gray-600 px-3 py-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="num_inference_steps" className="block mb-2">
                  Number of Inference Steps:
                </label>
                <input
                  id="num_inference_steps"
                  ref={numInferenceStepsInput}
                  type="number"
                  min="1"
                  max="50"
                  defaultValue="20"
                  className="bg-gray-800 border border-gray-600 px-3 py-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="guidance_scale" className="block mb-2">
                  Guidance Scale:
                </label>
                <input
                  id="guidance_scale"
                  ref={guidanceScaleInput}
                  type="number"
                  min="1"
                  max="20"
                  step="0.1"
                  defaultValue="7.5"
                  className="bg-gray-800 border border-gray-600 px-3 py-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="enhance_prompt" className="block mb-2">
                  Enhance Prompt:
                </label>
                <select
                  id="enhance_prompt"
                  ref={enhancePromptInput}
                  defaultValue="yes"
                  className="bg-gray-800 border border-gray-600 px-3 py-2 w-full rounded"
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
                  ref={seedInput}
                  type="text"
                  placeholder="Leave blank for a random seed"
                  className="bg-gray-800 border border-gray-600 px-3 py-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="webhook" className="block mb-2">
                  Webhook:
                </label>
                <input
                  id="webhook"
                  ref={webhookInput}
                  type="text"
                  placeholder="Webhook URL"
                  className="bg-gray-800 border border-gray-600 px-3 py-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="track_id" className="block mb-2">
                  Track ID:
                </label>
                <input
                  id="track_id"
                  ref={trackIdInput}
                  type="text"
                  placeholder="Tracking ID"
                  className="bg-gray-800 border border-gray-600 px-3 py-2 w-full rounded"
                />
              </div>
            </>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-blue-100 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Generate Image
        </button>
        {isLoading && (
          <div className="mt-2 text-yellow-400 font-semibold">Loading...</div>
        )}
      </form>
    </>
  );
};
function setIsLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}