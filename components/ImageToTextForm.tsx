import { useState } from 'react';
import { labelDetection } from '../lib/googleCloudVision';
import { ExpandCollapseToggle } from './ExpandCollapseToggle';

type Props = {
  isVisible: boolean;
};

const ImageToTextForm = ({ isVisible }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const generateDescription = async () => {
    if (!selectedFile) return;

    setLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target && e.target.result) {
          const imageBase64 = (e.target.result as string).split(',')[1];
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_VISION_API_KEY || '';
          const labels = await labelDetection(imageBase64, apiKey);
          const description = labels.join(', ');
          setGeneratedDescription(description);
        }
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {isVisible && (
        <div
          className={`fixed bottom-3 left-4 w-2/5 ${
            expanded ? 'h-96' : 'h-16'
          } bg-gray-800 p-4 rounded-lg shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold mb-4">Image to Text</div>
            <ExpandCollapseToggle
              expanded={expanded}
              onToggleExpand={handleToggleExpand}
            />
          </div>
          {expanded && (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4"
              />
              <button
                className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded mb-4"
                onClick={generateDescription}
                disabled={!selectedFile || loading}
              >
                {loading ? 'Generating...' : 'Generate Description'}
              </button>
              {generatedDescription && (
                <pre className="bg-gray-700 p-4 rounded-lg text-sm whitespace-pre-wrap">
                  {generatedDescription}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImageToTextForm;
