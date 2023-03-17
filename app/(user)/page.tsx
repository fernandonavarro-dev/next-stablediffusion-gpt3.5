'use client';
import { useState } from 'react';
import ChatGPTAssistant from '../../components/ChatGPTAssistant';
import { ImageGeneratorForm } from '../../components/ImageGeneratorForm';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <div className="h-screen bg-gray-900 text-gray-200 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 mt-16">
          Generate Images with Text
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <ImageGeneratorForm
              onGenerate={(generatedImageUrl: string) => {
                setImageUrl(generatedImageUrl);
              }}
            />
          </div>
          <div className="md:col-span-2">
            {imageUrl && (
              <div className="mt-0">
                <h2 className="text-2xl font-bold mb-2">Generated Image:</h2>
                <img
                  src={imageUrl}
                  alt="Generated"
                  className="border border-gray-300"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ChatGPTAssistant />
    </div>
  );
}
