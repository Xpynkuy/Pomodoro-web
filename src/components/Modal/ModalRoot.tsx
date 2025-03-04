import React from "react";
import { useModalStore } from "../../store/store";
import Modal from "./Modal";
import TaskForm from "../Tasks/TaskForm";

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
