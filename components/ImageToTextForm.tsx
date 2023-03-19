import { useState } from 'react';
// import { ImageAnnotatorClient } from '@google-cloud/vision';
import { labelDetection } from '../lib/googleCloudVision';
// import axios from 'axios';

// const client = new ImageAnnotatorClient();

type Props = {
  onDescriptionGenerated: (description: string) => void;
};

const ImageToTextForm = ({ onDescriptionGenerated }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  //   const fileToBase64 = (file: File): Promise<string> =>
  //     new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onload = () => resolve(reader.result as string);
  //       reader.onerror = (error) => reject(error);
  //       reader.readAsDataURL(file);
  //     });

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
          onDescriptionGenerated(description);
        }
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Image to Text:</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
        onClick={generateDescription}
        disabled={!selectedFile || loading}
      >
        {loading ? 'Generating...' : 'Generate Description'}
      </button>
    </div>
  );
};

export default ImageToTextForm;
