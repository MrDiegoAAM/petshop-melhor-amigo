import { useQuery } from '@tanstack/react-query';
import type { GalleryImage } from '@shared/schema';

interface GallerySectionProps {
  onOpenImage: (src: string, title: string) => void;
}

export function GallerySection({ onOpenImage }: GallerySectionProps) {
  const { data: images = [], isLoading } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery'],
  });

  if (isLoading) {
    return (
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Galeria de Fotos</h2>
            <p className="text-lg text-gray-600">Carregando imagens...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Galeria de Fotos</h2>
          <p className="text-lg text-gray-600">Alguns dos adoráveis clientes que já passaram pelo nosso petshop</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <img
              key={image.id}
              onClick={() => onOpenImage(image.url, image.description)}
              src={image.url}
              alt={image.description}
              className="rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer w-full h-48 object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
