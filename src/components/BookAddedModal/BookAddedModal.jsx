import Modal from "../Modal/Modal.jsx";
import ModalMessage from "../ModalMessage/ModalMessage.jsx";

const BookAddedModal = ({ onClose }) => (
  <Modal onClose={onClose} label="Book added">
    <ModalMessage image="/assets/thumbsup" title="Good job">
      Your book is now in <span style={{color: "var(--white)"}}>the library!</span> The joy knows no
      bounds and now you can start your training
    </ModalMessage>
  </Modal>
);

export default BookAddedModal;
