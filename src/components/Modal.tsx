import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <dialog open className="modal">
        <div className="modal-box">
          {children}
          <div className="modal-action">
            <button
              type="button"
              className="btn text-gray-500 bg-white!"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
