import React, { useState } from 'react';

type Props = {
  imageUrl: string;
  prompt: string;
  onDelete: () => void;
};

const GeneratedImageItem = ({ imageUrl, prompt, onDelete }: Props) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      onDelete();
    }
  };

  return (
    <div
      className="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600 relative"
      onMouseEnter={() => setShowDeleteButton(true)}
      onMouseLeave={() => setShowDeleteButton(false)}
    >
      {showDeleteButton && (
        <button
          className="absolute top-2 right-2 bg-red-500/80 text-white w-6 h-6 rounded-full text-s flex items-center justify-center"
          onClick={handleDelete}
        >
          X
        </button>
      )}
      <img
        src={imageUrl}
        alt="Generated"
        className="border border-gray-300 w-full h-48 object-cover object-center"
      />
      <p className="text-sm p-2 mb-2">{prompt}</p>
    </div>
  );
};

export default GeneratedImageItem;
