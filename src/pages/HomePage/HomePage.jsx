import { useState } from "react";
import Filters from "../../components/Filters/Filters.jsx";
import RecommendedBooks from "../../components/RecommendedBooks/RecommendedBooks.jsx";

const HomePage = () => {
  const [filters, setFilters] = useState({ title: "", author: "" });

  return (
    <div>
      <Filters onApply={setFilters} />
      <RecommendedBooks filters={filters} />
    </div>
  );
};

export default HomePage;