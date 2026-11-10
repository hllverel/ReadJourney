import Modal from "../Modal/Modal.jsx";
import ModalMessage from "../ModalMessage/ModalMessage.jsx";

const BookReadModal = ({ onClose }) => (
  <Modal onClose={onClose} label="The book is read">
    <ModalMessage image="/assets/books" title="Good job">
      It was an <span style={{color: "var(--white)"}}>exciting journey</span>, where each page revealed new horizons, and the characters became inseparable friends.
    </ModalMessage>
  </Modal>
);

export default BookReadModal;