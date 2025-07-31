import { useState, useCallback } from 'react';
import { ModalType, ModalState } from '@/lib/types';

export function useModal() {
  const [modalState, setModalState] = useState<ModalState>({
    activeModal: null,
    isOpen: false
  });

  const openModal = useCallback((modalType: ModalType) => {
    // Close any existing modal first
    if (modalState.isOpen) {
      setModalState({ activeModal: null, isOpen: false });
      // Small delay to allow closing animation
      setTimeout(() => {
        setModalState({ activeModal: modalType, isOpen: true });
        document.body.style.overflow = 'hidden';
      }, 50);
    } else {
      setModalState({ activeModal: modalType, isOpen: true });
      document.body.style.overflow = 'hidden';
    }
  }, [modalState.isOpen]);

  const closeModal = useCallback(() => {
    setModalState({ activeModal: null, isOpen: false });
    document.body.style.overflow = 'auto';
  }, []);

  const switchModal = useCallback((modalType: ModalType) => {
    setModalState({ activeModal: modalType, isOpen: true });
  }, []);

  return {
    modalState,
    openModal,
    closeModal,
    switchModal,
    isModalOpen: modalState.isOpen,
    activeModal: modalState.activeModal
  };
}
