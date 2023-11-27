import { shuffle } from "../helpers";
import QuestionProps from "../type/QuestionProps";

const Question = (question: QuestionProps) => {
  const questions = [
    question.correct_answer,
    question.incorrect_answers,
  ] as string[];
  const alternatives = shuffle(questions) as string[];

  return (
    <div key={question.id} title={question.id}>
      <div>{question.question}</div>
      {alternatives.map((question) => {
        return <div className="mt-2 p-2 border-2">{question}</div>;
      })}
    </div>
  );
};
export default Question;
