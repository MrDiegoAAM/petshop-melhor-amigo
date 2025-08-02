import { Button } from '@/components/ui/button';

export function HeroSection() {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('/doghappy.jpg')"
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6"> </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Cuidamos do seu pet com todo carinho e profissionalismo que ele merece
        </p>
        <Button 
          onClick={scrollToProducts}
          size="lg"
          className="bg-pet-green text-white hover:bg-pet-green-dark transition-all transform hover:scale-105 text-lg px-8 py-4 rounded-full"
        >
          Conheça Nossos Serviços
        </Button>
      </div>
    </section>
  );
}
