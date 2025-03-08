import React, { useRef } from "react";
import { useModalStore } from "../../../store/useModalStore";


interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const closeModal = useModalStore((state) => state.closeModal);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 animate-fadeIn z-50"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl p-6 w-full max-w-md animate-scaleIn relative z-50"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal; 