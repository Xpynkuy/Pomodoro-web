import React from "react";
import { useModalStore } from "../../store/store";
import Modal from "./Modal";
import NewTask from "../Tasks/NewTask";

const ModalRoot: React.FC = () => {
  const isModalOpen = useModalStore((state) => state.isModalOpen);

  if (!isModalOpen) return null;

  return (
    <Modal>
      <NewTask />
    </Modal>
  );
};

export default ModalRoot;
