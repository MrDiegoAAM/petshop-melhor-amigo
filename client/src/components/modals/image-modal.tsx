import { X } from 'lucide-react';
import { ImageModalData } from '@/lib/types';

interface ImageModalProps {
  onClose: () => void;
  imageData: ImageModalData;
}

export function ImageModal({ onClose, imageData }: ImageModalProps) {
  return (
    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{imageData.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <img 
          src={imageData.src} 
          alt={imageData.title} 
          className="w-full h-auto rounded-lg max-h-[70vh] object-contain"
        />
      </div>
    </div>
  );
}
