import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Dog, SprayCan, Gamepad2, Package } from 'lucide-react';
import type { Product } from '@shared/schema';

interface ProductsSectionProps {
  onRequestInfo: (message: string) => void;
  onOpenBooking: () => void;
}

export function ProductsSection({ onRequestInfo, onOpenBooking }: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'brinquedos' | 'higiene'>('all');

  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const { data: categoryProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products', selectedCategory],
    queryFn: () => fetch(`/api/products?category=${selectedCategory}`).then(res => res.json()),
    enabled: selectedCategory !== 'all',
  });

  const displayProducts = selectedCategory === 'all' ? allProducts : categoryProducts;

  const handleRequestInfo = () => {
    onRequestInfo("Gostaria de solicitar informações sobre a ração premium? Poderia me fornecer mais detalhes?");
  };

  const categories = [
    { id: 'all', name: 'Todos os Produtos', icon: Package },
    { id: 'brinquedos', name: 'Brinquedos Interativos', icon: Gamepad2 },
    { id: 'higiene', name: 'Produtos de Higiene', icon: SprayCan },
  ];

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Produtos e Serviços Diferenciados</h2>
          <p className="text-lg text-gray-600">Tudo o que seu pet precisa em um só lugar</p>
        </div>

        {/* Premium Food Section */}
        <div id="alimentacao" className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Alimentação de Qualidade</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img 
              src="/racaopremium.png" 
              alt="Ração Premium para pets" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
            <div>
              <h4 className="text-xl font-semibold mb-4">Ração Premium</h4>
              <p className="text-gray-600 mb-6">
                Nossa ração premium é formulada especialmente para oferecer a nutrição completa e balanceada 
                que seu pet precisa. Rica em proteínas de alta qualidade, vitaminas e minerais essenciais, 
                nossa ração garante saúde, vitalidade e sabor que os pets adoram.
              </p>
              <Button 
                onClick={handleRequestInfo}
                className="bg-pet-green text-white hover:bg-pet-green-dark"
              >
                Solicitar Informações
              </Button>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Nossos Serviços</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-4">Tosa Especializada</h4>
              <p className="text-gray-600 mb-6">
                Oferecemos serviços de tosa especializados para cães de todas as raças e tamanhos. Nossos 
                profissionais são capacitados para realizar cortes adequados para cada tipo de pelagem, 
                respeitando as características de cada raça e as preferências dos tutores.
              </p>
              <Button 
                onClick={onOpenBooking}
                className="bg-pet-green text-white hover:bg-pet-green-dark mr-4 mb-2"
              >
                Agendar Serviço
              </Button>
            </div>
            <img 
              src="/tosa.png" 
              alt="Tosa especializada para pets" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>

        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img 
              src="/banhorelaxante_1753978208956.png" 
              alt="Banho relaxante para pets" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
            <div>
              <h4 className="text-xl font-semibold mb-4">Banho Relaxante</h4>
              <p className="text-gray-600 mb-6">
                Oferecemos banhos relaxantes para cães e gatos. Utilizamos produtos de qualidade, seguros e 
                adequados para cada tipo de pelagem, garantindo uma limpeza profunda e refrescante. Nossos 
                profissionais proporcionam um ambiente tranquilo para que seu pet desfrute de um banho agradável.
              </p>
              <Button 
                onClick={onOpenBooking}
                className="bg-pet-green text-white hover:bg-pet-green-dark"
              >
                Agendar Serviço
              </Button>
            </div>
          </div>
        </div>

        {/* Products Navigation */}
        <div id="nossos-produtos" className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Nossos Produtos</h3>
          
          {/* Category Filter */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id as any)}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-pet-green text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pet-green mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando produtos...</p>
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhum produto encontrado nesta categoria.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/attached_assets/banho relaxante_1753978208956.png';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-pet-green">R$ {product.price}</span>
                      <Button 
                        size="sm"
                        onClick={() => onRequestInfo(`Gostaria de saber mais sobre o produto: ${product.name}. Poderia me fornecer mais informações?`)}
                        className="bg-pet-green text-white hover:bg-pet-green-dark text-xs px-3 py-1"
                      >
                        Solicitar Info
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Overview */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-center mb-6">
              <Gamepad2 className="text-pet-green text-4xl mb-4 mx-auto" />
              <h4 className="text-xl font-semibold">Brinquedos Interativos</h4>
            </div>
            <p className="text-gray-600 text-center">
              Variedade de brinquedos que estimulam a mente e o corpo do seu pet, promovendo exercício 
              físico e mental saudável.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-center mb-6">
              <SprayCan className="text-pet-green text-4xl mb-4 mx-auto" />
              <h4 className="text-xl font-semibold">Produtos de Higiene</h4>
            </div>
            <p className="text-gray-600 text-center">
              Shampoos, condicionadores, escovas e acessórios essenciais para manter seu pet 
              limpo, confortável e bem cuidado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}