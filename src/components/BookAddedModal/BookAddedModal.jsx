import Modal from "../Modal/Modal.jsx";
import ModalMessage from "../ModalMessage/ModalMessage.jsx";

const BookAddedModal = ({ onClose }) => (
  <Modal onClose={onClose} label="Book added">
    <ModalMessage icon="👍" iconLabel="Thumbs up" title="Good job">
      Your book is now in <strong>the library!</strong> The joy knows no
      bounds and now you can start your training
    </ModalMessage>
  </Modal>
);

export default BookAddedModal;