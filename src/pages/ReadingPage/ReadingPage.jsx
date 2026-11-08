import { useParams } from "react-router-dom";

const ReadingPage = () => {
  const { bookId } = useParams();

  return (
    <div>
      <h1>Reading</h1>
      <p>{bookId}</p>
    </div>
  );
};

export default ReadingPage;