'use client';
import ChatGPTAssistant from '../../components/ChatGPTAssistant';
import { ImageGenerator } from '../../components/ImageGenerator';

export default function Home() {
  return (
    <div className="h-screen bg-gray-900 text-gray-200 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 mt-16">
          Generate Image with Text
        </h1>
        <ImageGenerator
          onGenerate={function (imageUrl: string): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
      <ChatGPTAssistant />
    </div>
  );
}
