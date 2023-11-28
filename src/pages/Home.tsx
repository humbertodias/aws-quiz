import { useState, useEffect } from "react";
import Api from "../services/Api";
import ExamProps from "../type/ExamProps";
import ExamCard from "../components/ExamCard";
import Navbar from "../components/Navbar";


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
    <div className="flex justify-center flex-wrap mt-28">
      <Navbar title="AWS - Quiz" image="github.svg" url="https://github.com/humbertodias/aws-quiz" target={"_blank"} />
      {error?.message}
      {exams.map((exam) => {
        return (
          <ExamCard {...exam} />
        )
      })}
    </div>
  );
}
export default Home;
