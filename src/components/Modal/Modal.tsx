import React, { useRef } from "react";
import { useTasksStore } from "../../store/store";

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const { isModalOpen, closeModal } = useTasksStore();
  const modalRef = useRef<HTMLDivElement>(null);

  const hanldeOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  if (!isModalOpen) return null;
  return (
    <div
      onClick={hanldeOverlayClick}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-xl shadow-lg h-[450px] w-[500px]"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
