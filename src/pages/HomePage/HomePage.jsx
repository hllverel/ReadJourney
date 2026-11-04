import { useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import WorkoutGuide from "../../components/WorkoutGuide/WorkoutGuide.jsx";
import Quote from "../../components/Quote/Quote.jsx";
import RecommendedBooks from "../../components/RecommendedBooks/RecommendedBooks.jsx";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [filters, setFilters] = useState({ title: "", author: "" });

  return (
    <div className={styles.page}>
      <Dashboard>
        <Filters onApply={setFilters} />
        <WorkoutGuide />
        <Quote />
      </Dashboard>
      <RecommendedBooks filters={filters} />
    </div>
  );
};

export default HomePage;