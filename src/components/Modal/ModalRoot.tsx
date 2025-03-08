import React from "react";
import { useModalStore } from "../../store/useModalStore";
import TaskForm from "../Tasks/TaskForm";
import Modal from "../UI/modal/Modal";

const ModalRoot: React.FC = () => {
  const isModalOpen = useModalStore((state) => state.isModalOpen);

  if (!isModalOpen) return null;

  return (
    <Modal>
      <TaskForm />
    </Modal>
  );
};

export default ModalRoot;
