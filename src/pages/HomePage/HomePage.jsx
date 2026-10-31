import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendedBooks } from "../../redux/books/operations.js";
import { selectBooks } from "../../redux/books/selectors.js";

const HomePage = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);

  useEffect(() => {
    dispatch(getRecommendedBooks({ page: 1, limit: 2 }));
  }, [dispatch]);

  console.log(books);

  return (
    <div>
      <h1>Recommended</h1>
    </div>
  );
};

export default HomePage;