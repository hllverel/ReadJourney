import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addRecommendedBook } from "../../redux/library/operations.js";
import { selectLibraryBooks } from "../../redux/library/selectors.js";
import { isBookInLibrary } from "../../utils/isBookInLibrary.js";
import { useModal } from "../../hooks/useModal.js";
import Modal from "../Modal/Modal.jsx";
import BookDetails from "../BookDetails/BookDetails.jsx";
import BookAddedModal from "../BookAddedModal/BookAddedModal.jsx";

const AddToLibraryModals = ({ book, onClose }) => {
  const dispatch = useDispatch();
  const libraryBooks = useSelector(selectLibraryBooks);
  const successModal = useModal();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (isBookInLibrary(libraryBooks, book)) {
      toast.error("This book is already in your library");
      return;
    }

    setIsAdding(true);
    try {
      await dispatch(addRecommendedBook(book._id)).unwrap();
      onClose();
      successModal.open();
    } catch (message) {
      toast.error(message);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      {book && (
        <Modal onClose={onClose} label="Book details">
          <BookDetails
            book={book}
            actionLabel="Add to library"
            onAction={handleAdd}
            isPending={isAdding}
          />
        </Modal>
      )}
      {successModal.isOpen && <BookAddedModal onClose={successModal.close} />}
    </>
  );
};

export default AddToLibraryModals;
