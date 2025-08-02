import { Heart, Shield, Star } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Bem-vindo ao Petshop "Melhor Amigo"!</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            No Petshop "Melhor Amigo", nós entendemos que seu animal de estimação é mais do que apenas um bichinho, 
            é um membro especial da sua família. Com isso em mente, estamos comprometidos em fornecer cuidados 
            excepcionais e serviços de alta qualidade para garantir que seu melhor amigo tenha uma vida feliz e saudável.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-pet-green-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="text-pet-green text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Cuidado Especializado</h3>
            <p className="text-gray-600">Profissionais qualificados e apaixonados por animais</p>
          </div>
          
          <div className="text-center">
            <div className="bg-pet-green-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="text-pet-green text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ambiente Seguro</h3>
            <p className="text-gray-600">Instalações modernas e seguras para o conforto do seu pet</p>
          </div>
          
          <div className="text-center">
            <div className="bg-pet-green-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Star className="text-pet-green text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Qualidade Premium</h3>
            <p className="text-gray-600">Produtos e serviços de alta qualidade para seu melhor amigo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
