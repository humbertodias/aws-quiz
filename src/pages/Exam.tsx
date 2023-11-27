import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionProps from "../type/QuestionProps";
import Question from "../components/Question";
import Api from "../services/Api";

const Exam = () => {
  const { id } = useParams<string>();

  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    Api.get("/json/questions.json")
      .then((response) => {
        setQuestions(randomQuestions(response.data.results, id));
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, []);

  const randomQuestions = (q: QuestionProps[], id: string | undefined) => {
    return q
      .filter((question) => question.task == id)
      .sort(() => Math.random() - 0.5);
  };

  const onPrevious = () => {
    canMoveLeft() && setCurrent(current - 1);
  };

  const onNext = () => {
    canMoveRight() && setCurrent(current + 1);
  };

  const canMoveRight = () => {
    return current + 1 < questions.length;
  };

  const canMoveLeft = () => {
    return current > 0;
  };

  return (
    <div>
      <h1 className="text-lg p-5">Exam {id}</h1>
      {error?.message}
      <Question {...questions[current]} />
      <h1 className="text-center">
        <div>
          {current + 1} / {questions.length}
        </div>
        <div>
          <button onClick={onPrevious}>Previous</button> |{" "}
          <button onClick={onNext}>Next</button>
        </div>
      </h1>
    </div>
  );
};

export default Exam;
