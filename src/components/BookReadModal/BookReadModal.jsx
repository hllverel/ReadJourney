import Modal from "../Modal/Modal.jsx";
import ModalMessage from "../ModalMessage/ModalMessage.jsx";

const BookReadModal = ({ onClose }) => (
  <Modal onClose={onClose} label="Book finished">
    <ModalMessage icon="📚" iconLabel="Books" title="The book is read">
      It was an <strong>exciting journey</strong>, where each page revealed new
      horizons, and the characters became inseparable friends.
    </ModalMessage>
  </Modal>
);

export default BookReadModal;
