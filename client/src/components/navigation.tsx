import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Calendar, User, PawPrint } from 'lucide-react';

interface NavigationProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export function Navigation({ onOpenBooking, onOpenAdmin }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <PawPrint className="text-pet-green text-2xl" />
            <span className="text-xl font-bold text-gray-800">Melhor Amigo</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-pet-green transition-colors"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-pet-green transition-colors"
            >
              Quem Somos
            </button>
            <button 
              onClick={() => scrollToSection('nossos-produtos')}
              className="text-gray-700 hover:text-pet-green transition-colors"
            >
              Produtos
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-gray-700 hover:text-pet-green transition-colors"
            >
              Galeria
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-pet-green transition-colors"
            >
              Contato
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              onClick={onOpenBooking}
              className="bg-pet-green text-white hover:bg-pet-green-dark"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Agendar
            </Button>
            <button 
              onClick={onOpenAdmin}
              className="text-gray-600 hover:text-pet-green"
            >
              <User className="w-5 h-5" />
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="text-gray-700" /> : <Menu className="text-gray-700" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-3 py-2 text-gray-700"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-3 py-2 text-gray-700"
            >
              Quem Somos
            </button>
            <button 
              onClick={() => scrollToSection('nossos-produtos')}
              className="block w-full text-left px-3 py-2 text-gray-700"
            >
              Produtos
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="block w-full text-left px-3 py-2 text-gray-700"
            >
              Galeria
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 text-gray-700"
            >
              Contato
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
