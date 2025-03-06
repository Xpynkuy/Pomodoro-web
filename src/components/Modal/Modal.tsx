// components/Modal/Modal.tsx
import React, { useRef } from "react";
import { useModalStore } from "../../store/store";

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
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div
        ref={modalRef}
        className="z-50 bg-white p-6 rounded-xl shadow-lg w-[500px]"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
