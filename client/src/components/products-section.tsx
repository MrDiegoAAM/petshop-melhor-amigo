import { Button } from '@/components/ui/button';
import { Dog, Scissors, SprayCan } from 'lucide-react';

interface ProductsSectionProps {
  onRequestInfo: (message: string) => void;
  onOpenBooking: () => void;
}

export function ProductsSection({ onRequestInfo, onOpenBooking }: ProductsSectionProps) {
  const handleRequestInfo = () => {
    onRequestInfo("Gostaria de solicitar informações sobre a ração premium? Poderia me fornecer mais detalhes?");
  };

  return (
    <section id="products" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Nossos Produtos e Serviços</h2>
          <p className="text-lg text-gray-600">Tudo o que seu pet precisa em um só lugar</p>
        </div>

        {/* Ração Premium */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Alimentação</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img 
              src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Ração premium para pets" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
            <div>
              <h4 className="text-xl font-semibold mb-4">Ração Premium</h4>
              <p className="text-gray-600 mb-6">
                Oferecemos uma seleção de rações premium para cães e gatos. Essas rações são formuladas com 
                ingredientes de alta qualidade, garantindo uma nutrição balanceada e adequada para o seu pet. 
                Temos opções para diferentes idades, raças e necessidades específicas.
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

        {/* Serviços de Tosa */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Tosa Especializada</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h4 className="text-xl font-semibold mb-4">Serviço de Tosa Especializada</h4>
              <p className="text-gray-600 mb-6">
                Proporcionamos serviços profissionais de tosa para cães de todas as raças. Nossos tosadores 
                experientes e qualificados utilizam técnicas avançadas para garantir que seu pet tenha um visual 
                impecável. Além de cortes personalizados, também realizamos limpeza de ouvidos e corte de unhas.
              </p>
              <Button 
                onClick={onOpenBooking}
                className="bg-pet-green text-white hover:bg-pet-green-dark"
              >
                Agendar Serviço
              </Button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1560743173-567a3b5658b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Serviço de tosa especializada" 
              className="rounded-xl shadow-lg w-full h-auto order-1 md:order-2"
            />
          </div>
        </div>

        {/* Banho Relaxante */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Higiene e Limpeza</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img 
              src="https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
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

        {/* Additional Products */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="text-center mb-6">
              <Dog className="text-pet-green text-4xl mb-4 mx-auto" />
              <h4 className="text-xl font-semibold">Brinquedos Interativos</h4>
            </div>
            <p className="text-gray-600 text-center">
              Variedade de brinquedos que estimulam a mente e o corpo do seu pet, promovendo exercício 
              físico e mental saudável.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl">
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
