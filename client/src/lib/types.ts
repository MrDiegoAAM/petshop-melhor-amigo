export type ModalType = 'booking' | 'admin' | 'adminPanel' | 'image' | null;

export interface ModalState {
  activeModal: ModalType;
  isOpen: boolean;
}

export interface ImageModalData {
  src: string;
  title: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
