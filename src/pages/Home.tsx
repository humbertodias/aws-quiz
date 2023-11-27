import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../services/Api";
import ExamProps from "../type/ExamProps";


function Home() {
  const [exams, setExams] = useState<ExamProps[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    Api
      .get("/json/exams.json")
      .then((response) => {
        setExams(response.data.results);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <>
      {error}
      {exams.map((exam) => {
        return (
          <p>
            <Link to={`/exam/${exam.id}`}>
            <img src={exam.image} title={exam.description} style={{ width: 340, height: 340 }} />
            </Link>
          </p>
          
        );
      })}
    </>
  );
}
export default Home;
