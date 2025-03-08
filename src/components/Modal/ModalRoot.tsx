import React from "react";

import Modal from "../UI/Modal/Modal";
import TaskForm from "../Tasks/TaskForm";
import { useModalStore } from "../../store/useModalStore";

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
