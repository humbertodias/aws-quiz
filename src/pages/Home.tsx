import { useState, useEffect } from "react";
import Api from "../services/Api";
import ExamProps from "../type/ExamProps";
import Card from "../components/Card";


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
          <Card {...exam} />
        );
      })}
    </>
  );
}
export default Home;
