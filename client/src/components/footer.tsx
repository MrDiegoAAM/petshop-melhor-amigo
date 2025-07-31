import { PawPrint } from 'lucide-react';
import { SiFacebook, SiInstagram } from 'react-icons/si';

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <PawPrint className="text-pet-green text-2xl" />
              <span className="text-xl font-bold">Melhor Amigo</span>
            </div>
            <p className="text-gray-400">
              Cuidando do seu pet com amor e profissionalismo há mais de 10 anos.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Tosa Especializada</li>
              <li>Banho Relaxante</li>
              <li>Venda de Ração</li>
              <li>Produtos de Higiene</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="hover:text-pet-green transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('products')}
                  className="hover:text-pet-green transition-colors"
                >
                  Produtos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('gallery')}
                  className="hover:text-pet-green transition-colors"
                >
                  Galeria
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-pet-green transition-colors"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pet-green transition-colors">
                <SiFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pet-green transition-colors">
                <SiInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pet-green transition-colors">
                <span className="text-2xl">📱</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Petshop Melhor Amigo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
