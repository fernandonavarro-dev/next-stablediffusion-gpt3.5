'use client';
import { useState, useEffect } from 'react';
import ChatGPTAssistant from '../../components/ChatGPTAssistant';
import { ImageGeneratorForm } from '../../components/ImageGeneratorForm';
import ImageToTextForm from '../../components/ImageToTextForm';
import GeneratedImageItem from '../../components/GeneratedImageItem';

interface GeneratedImage {
  imageUrl: string;
  prompt: string;
}

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [imageToTextVisible, setImageToTextVisible] = useState(true);

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
      ...generatedImages.slice(-11),
    ];
    setGeneratedImages(newGeneratedImages);
    localStorage.setItem('generatedImages', JSON.stringify(newGeneratedImages));
    setIsLoading(false);
  };

  // const handleDescriptionGenerated = (description: string) => {
  //   console.log('Generated Description:', description);
  //   setGeneratedDescription(description);
  //   setShowModal(true);
  // };

  const closeModal = () => {
    setShowModal(false);
  };

  // const toggleImageToTextVisible = () => {
  //   setImageToTextVisible((prevState) => !prevState);
  // };

  const handleDeleteImage = (index: number) => {
    const newGeneratedImages = [...generatedImages];
    newGeneratedImages.splice(index, 1);
    setGeneratedImages(newGeneratedImages);
    localStorage.setItem('generatedImages', JSON.stringify(newGeneratedImages));
  };

  return (
    <div className="h-screen text-gray-200 px-4">
      <div className="container mx-auto text-center">
        <div className="bg-gray-700 p-4">
          <div className="flex justify-around">
            <img
              src="/stablediffusion-logo-cropped.png"
              alt="StableDifussion AI Logo"
              className="inline-block rounded-full h-24"
            />
            <img
              src="/openai-logo.png"
              alt="OpenAI Logo"
              className="inline-block rounded-full h-24"
            />
            <img
              src="/google-cloud-vision-api-logo-cropped.png"
              alt="Google Cloud Vision API Logo"
              className="inline-block rounded-full h-20"
            />
          </div>
          <h1 className="text-4xl font-semibold upp inline-block mb-10 mt-8">
            Generate Images with Text
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-4 text-left">
          <div className="md:col-span-1">
            <ImageGeneratorForm
              onGenerate={handleGenerate}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <div className="mt-8">
              <ImageToTextForm
                // onDescriptionGenerated={handleDescriptionGenerated}
                isVisible={imageToTextVisible}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="mt-0 text-center">
              <h2 className="text-2xl font-bold mb-2">Generated Image:</h2>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Generated"
                  className="border border-gray-300 inline-block"
                />
              ) : (
                <div className="border border-gray-300 ml-14 mt-10 w-10/12 h-96 flex items-center justify-center animate-pulse">
                  <span className="text-6xl font-bold text-gray-400 animate-pulse">
                    ?
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 pb-12">
          <h2 className="text-2xl font-bold mt-12 mb-8 text-center">
            Last 10 Generated Images:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedImages.map((generatedImage, index) => (
              <GeneratedImageItem
                key={index}
                imageUrl={generatedImage.imageUrl}
                prompt={generatedImage.prompt}
                onDelete={() => handleDeleteImage(index)}
              />
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="bg-black bg-opacity-50 w-full h-full absolute"
              onClick={closeModal}
            ></div>
            <div className="bg-gray-800 p-8 w-11/12 md:w-1/2 xl:w-1/3 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                Generated Description:
              </h2>
              <p className="text-sm mb-4">
                Copy the description below and paste it into the StableDifussion
                input prompt:
              </p>
              <pre className="bg-gray-700 p-4 rounded-lg text-sm whitespace-pre-wrap">
                {generatedDescription}
              </pre>
              <button
                className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <ChatGPTAssistant />
    </div>
  );
}
