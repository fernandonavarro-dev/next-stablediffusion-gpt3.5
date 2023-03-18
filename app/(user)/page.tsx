'use client';
import { useState, useEffect } from 'react';
import ChatGPTAssistant from '../../components/ChatGPTAssistant';
import { ImageGeneratorForm } from '../../components/ImageGeneratorForm';

interface GeneratedImage {
  imageUrl: string;
  prompt: string;
}

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedImages = JSON.parse(
      localStorage.getItem('generatedImages') || '[]'
    );
    setGeneratedImages(savedImages);
  }, []);

  const handleGenerate = (generatedImageUrl: string, promptText: string) => {
    setImageUrl(generatedImageUrl);
    const newGeneratedImages = [
      { imageUrl: generatedImageUrl, prompt: promptText },
      ...generatedImages.slice(-9),
    ];
    setGeneratedImages(newGeneratedImages);
    localStorage.setItem('generatedImages', JSON.stringify(newGeneratedImages));
    setIsLoading(false);
  };

  return (
    <div className="h-screen text-gray-200 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-14 mt-8 text-center">
          Generate Images with Text
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <ImageGeneratorForm
              onGenerate={handleGenerate}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
          <div className="md:col-span-2">
            {imageUrl && (
              <div className="mt-0 text-center">
                <h2 className="text-2xl font-bold mb-2">Generated Image:</h2>
                <img
                  src={imageUrl}
                  alt="Generated"
                  className="border border-gray-300 inline-block"
                />
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 pb-12">
          <h2 className="text-2xl font-bold mt-12 mb-8 text-center">
            Last 10 Generated Images:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedImages.map((generatedImage, index) => (
              <div
                key={index}
                className="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600"
              >
                <img
                  src={generatedImage.imageUrl}
                  alt="Generated"
                  className="border border-gray-300 w-full h-48 object-cover object-center"
                />
                <p className="text-sm p-2 mb-2">{generatedImage.prompt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ChatGPTAssistant />
    </div>
  );
}
