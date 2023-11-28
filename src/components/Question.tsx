import { shuffle } from "../helpers";
import QuestionProps from "../type/QuestionProps";
import Alternative from "./Alternative";

const Question = (question: QuestionProps) => {
  const questions = [
    ...question.correct_answers,
    ...question.incorrect_answers
  ] as string[];
  const alternatives = shuffle(questions) as string[];

  const onSelect = (anwser: string) => {
    if (question.correct_answers.includes(anwser)) {
      alert('Correct')
    } else {
      alert('Incorrect')
    }
  };
  return (
    <div key={question.id}>
      <div>{question.question}</div>
        {alternatives.map((text, index) => {
          return <Alternative index={index} statement={text} onClick={onSelect} />;
        })}
    </div>
  );
};
export default Question;
