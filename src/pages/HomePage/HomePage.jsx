import { useBooksPerPage } from "../../hooks/useBooksPerPage.js";
import RecommendedBooks from "../../components/RecommendedBooks/RecommendedBooks.jsx";

const HomePage = () => {
  const limit = useBooksPerPage();

  return (
    <div>
      <RecommendedBooks limit={limit} />
    </div>
  );
};

export default HomePage;