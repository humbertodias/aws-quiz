import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionProps from "../type/QuestionProps";
import Question from "../components/Question";
import Api from "../services/Api";

const Exam = () => {
  const { id } = useParams<string>();

  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    Api
      .get("/json/questions.json")
      .then((response) => {
        setQuestions(response.data.results);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, []);

  return (
    <div>
      <h1>Exam {id} </h1>

      {error?.message}
      {questions
        .filter((question) => question.task == id)
        .sort(() => Math.random() - 0.5)
        .map((question) => {
          return <Question {...question} />;
        })}
    </div>
  );
};

export default Exam;
