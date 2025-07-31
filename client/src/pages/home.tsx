import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { ProductsSection } from '@/components/products-section';
import { GallerySection } from '@/components/gallery-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { ModalOverlay } from '@/components/modal-overlay';
import { BookingModal } from '@/components/modals/booking-modal';
import { AdminModal, AdminPanel } from '@/components/modals/admin-modal';
import { ImageModal } from '@/components/modals/image-modal';
import { useModal } from '@/hooks/use-modal';
import { ImageModalData } from '@/lib/types';

export default function Home() {
  const { modalState, openModal, closeModal, switchModal, isModalOpen } = useModal();
  const [imageModalData, setImageModalData] = useState<ImageModalData>({ src: '', title: '' });
  const [prefilledMessage, setPrefilledMessage] = useState<string>('');

  const handleRequestInfo = (message: string) => {
    setPrefilledMessage(message);
    // Scroll to contact section
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenImage = (src: string, title: string) => {
    setImageModalData({ src, title });
    openModal('image');
  };

  const handleAdminLoginSuccess = () => {
    switchModal('adminPanel');
  };

  const renderModal = () => {
    switch (modalState.activeModal) {
      case 'booking':
        return <BookingModal onClose={closeModal} />;
      case 'admin':
        return <AdminModal onClose={closeModal} onLoginSuccess={handleAdminLoginSuccess} />;
      case 'adminPanel':
        return <AdminPanel onClose={closeModal} />;
      case 'image':
        return <ImageModal onClose={closeModal} imageData={imageModalData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation 
        onOpenBooking={() => openModal('booking')}
        onOpenAdmin={() => openModal('admin')}
      />
      
      <HeroSection />
      <AboutSection />
      <ProductsSection 
        onRequestInfo={handleRequestInfo}
        onOpenBooking={() => openModal('booking')}
      />
      <GallerySection onOpenImage={handleOpenImage} />
      <ContactSection prefilledMessage={prefilledMessage} />
      <Footer />

      <ModalOverlay isOpen={isModalOpen} onClose={closeModal}>
        {renderModal()}
      </ModalOverlay>
    </div>
  );
}
