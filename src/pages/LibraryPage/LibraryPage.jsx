import Dashboard from "../../components/Dashboard/Dashboard.jsx";
import AddBookForm from "../../components/AddBookForm/AddBookForm.jsx";
import MyLibraryBooks from "../../components/MyLibraryBooks/MyLibraryBooks.jsx";
import RecommendedPreview from "../../components/RecommendedPreview/RecommendedPreview.jsx";
import styles from "./LibraryPage.module.css";

const LibraryPage = () => (
  <div className={styles.page}>
    <Dashboard>
      <AddBookForm />
      <RecommendedPreview />
    </Dashboard>
    <MyLibraryBooks />
  </div>
);

export default LibraryPage;
